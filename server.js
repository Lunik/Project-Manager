// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;

//sauvegarde de fichier
var fs = require('fs');
saveFile("public/log","");

server.listen(port, function () {
  log('Server listening at port '+port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var Users = {
	'count':0,
	'usernames':{}
};

var Projects = {};
loadProjects();

io.on('connection', function (socket) {
	socket.on('change project', function(project){
		if(Projects[project]){
			socket.project = project;
			socket.join(socket.project);

			socket.emit('login',{
				"project": {
					"name":socket.project,
					"data":Projects[socket.project]
				}
			});
		} else {
			socket.project = 'default';
			socket.join(socket.project);
			socket.emit('login',{
				"project": {
					"name":socket.project,
					"data":Projects[socket.project]
				}
			});
		}
	});

	socket.on('new project', function(project){
		Projects[project] = {
			"name":project,
			"tasks":{
				"normal":{},
				"urgent":{},
				"very-urgent":{},
				"done":{}
			}
		}
		saveProject(Projects[project]);
		socket.project = project;
		socket.join(socket.project);

		socket.emit('login',{
			"project": {
				"name":socket.project,
				"data":Projects[socket.project]
			}
		});
	});

	socket.on('move', function(data){
		if(data.to != data.from){
			Projects[socket.project].tasks[data.to][data.element] = Projects[socket.project].tasks[data.from][data.element];
			delete Projects[socket.project].tasks[data.from][data.element];
			socket.broadcast.to(socket.project).emit('move',data);
			saveProject(Projects[socket.project]);
		}
	});

	socket.on('new task', function(data){
		console.log(data);
		Projects[socket.project].tasks[data.to][data.id] = data.task;
		socket.broadcast.to(socket.project).emit('new task',data);
		socket.emit('new task',data);
		saveProject(Projects[socket.project]);
	});
});

function saveProject(project){
	saveFile("projects/"+project.name+".json",JSON.stringify(project));
}

function loadProjects(){
	fs.readdir("projects",function(err,files) {
    	if(err) {
        	return log(err);
    	}
    	for(var key in files){
    		if(files[key] != ".DS_Store"){
	    		fs.readFile("projects/"+files[key],"utf-8","r",function(err, data){
	    			if(err) {
	        			return log(err);
	    			}
	    			data = JSON.parse(data);
	    			Projects[data.name.toLowerCase()] = data;
	    		});
    		}
    	}
	});
}

function log(text){
	console.log(text);
	addFile("log", "["+getDate()+"] "+text+"\n");
}

function getDate(){
	var date = new Date();
	return date.getDate()+"/"+(date.getMonth()+1)+" "+(date.getHours()+1)+":"+(date.getMinutes()+1)+":"+(date.getSeconds()+1);
}

function saveFile(path,text){
	fs.writeFile(path, text, function(err) {
    	if(err) {
        	return log(err);
    	}
	});
}

function addFile(path,text){
	fs.appendFile(path, text, function(err) {
    	if(err) {
        	return log(err);
    	}
	});
}
socket.on('login', function (data) {
	window.location = "#"+data.project.name;
	displayProject(data.project.data);
});

socket.on('move',function(data){
	$('.task#'+data.element).appendTo('.content#'+data.to);
});

socket.on('new task',function(data){
	$('.tasks#'+data.to+" .content").append(displayTask(data.id,data.task));
});

function displayTask(id,task){
	var $task = $('<div>').addClass('task').attr('id',id).text(task.name)
		.draggable({ revert : true });
	if(task.owner != ""){
		$task.addClass('owned');
	}
	var $description = $('<p>').addClass('description').text(task.description).appendTo($task);

	//Show description
	$task.hover(function(){
		$description.addClass('active');
	},function(){
		$description.removeClass('active');
	});
	return $task;
}

function newTask(name,description,to){
	var task = {};
	task.name = name.substring(1,15);
	task.owner = "";
	task.description = description;

	socket.emit('new task',{
		'id':name.toLowerCase().replace(/\ /g,"-"),
		'task':task,
		'to':to
	});
}

function newTaskHtml(){
	var $html = $('<div>').addClass('newTaskHtml');
	var $name = $('<input>').attr('type',"text").attr('name',"name").attr('placeholder',"Nom...").appendTo($html)
		.focus(function(){
			$(this).css('background-color','')
		});
	var $etat = $('<select>').attr('name',"etat")
		.append($('<option>').attr('value','normal').text("Normal"))
		.append($('<option>').attr('value','urgent').text("Urgent"))
		.append($('<option>').attr('value','very-urgent').text("Très Urgent"))
		.append($('<option>').attr('value','done').text("Fini"))
		.appendTo($html)
		.focus(function(){
			$(this).css('background-color','')
		});
	var $description = $('<textarea>').attr('name',"description").attr('placeholder',"Description...").appendTo($html)
		.focus(function(){
			$(this).css('background-color','')
		});
	$('<input>').attr('type',"submit").attr('value',"Ajouter").appendTo($html).click(function(){
		if($name.val() && $description.val() && $etat.val()){
			newTask($name.val(), $description.val(), $etat.val());
			popupClose();
		} else {
			if($name.val() == ""){
				$name.css('background-color','red');
			} else if($description.val() == ""){
				$description.css('background-color','red');
			} else if($etat.val() == ""){
				$etat.css('background-color','red');
			}
		}
	});

	return $html;
}

$('.newtask').click(function(){
	var p = new Popup();
	p.init(null, null, null, null, "Nouvelle Tâche", newTaskHtml(),true);
	p.draw();
});


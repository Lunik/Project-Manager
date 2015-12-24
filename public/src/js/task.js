
function displayTask(id,task){
	var $task = $('<div>').addClass('task').attr('id',id).text(task.name).draggable({
		revert : true
	});
	if(task.owner != ""){
		$task.addClass('owned');
	}
	return $task;
}

function newTask(name,description,to){
	var task = {};
	task.name = name;
	task.owner = "";
	task.description = description;

	socket.emit('new task',{
		'id':name.toLowerCase(),
		'task':task,
		'to':to
	});
}

function newTaskHtml(){
	var $html = $('<div>').addClass('newTaskHtml');
	var $name = $('<input>').attr('type',"text").attr('name',"name").attr('placeholder',"Nom...").appendTo($html);
	var $etat = $('<select>').attr('name',"etat")
		.append($('<option>').attr('value','normal').text("Normal"))
		.append($('<option>').attr('value','urgent').text("Urgent"))
		.append($('<option>').attr('value','very-urgent').text("Très Urgent"))
		.append($('<option>').attr('value','done').text("Fini"))
		.appendTo($html);
	var $description = $('<textarea>').attr('name',"description").attr('placeholder',"Description...").appendTo($html);
	$('<input>').attr('type',"submit").attr('value',"Ajouter").appendTo($html).click(function(){
		if($name.val() && $description.val() && $etat.val()){
			newTask($name.val(), $description.val(), $etat.val());
			popupClose();
		}
	});

	return $html;
}

$('.newtask').click(function(){
	var p = new Popup();
	p.init(null, null, null, null, "Nouvelle Tâche", newTaskHtml(),true);
	p.draw();
});
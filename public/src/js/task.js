
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

initPopupTask()

function displayTask(id,task){
	var $task = $('<div>').addClass('task').attr('id',id).text(task.name)
		.draggable({ revert : true })
	if(task.owner != ''){
		$task.addClass('owned')
	}
	var $description = $('<p>').addClass('description').text(task.description).appendTo($task)

	//Show description
	$task.hover(function(){
		$description.addClass('active')
	},function(){
		$description.removeClass('active')
	})
	return $task
}

function newTask(name,description,to){
	var task = {}
	task.name = name.substring(0,15)
	task.owner = ''
	task.description = description

	socket.emit('new task',{
		'id':name.toLowerCase().replace(/\ /g,'-'),
		'task':task,
		'to':to
	})
}

function initPopupTask(){
	$('.popup#new_task input[type=submit]').click(function(){
		var name = $('.popupHtml .popup#new_task input[name=name]').val()
		var status = $('.popupHtml .popup#new_task select[name=status]').val()
		var description = $('.popupHtml .popup#new_task textarea[name=description]').val()
		if(name && status && description){
			newTask(name, description, status)
			$.popupjs.remove()
		}
	})
}

$('.newtask').click(function(){
	$.popupjs.init({
		pos: {
			x: null,
			y: null
		},
		width: '50%',
		height: '50%',
		title: 'Nouvelle Tâche',
		html: $('.popup#new_task'),
		closeBut: true
	})
	$.popupjs.draw()
})


function displayTasks(name,tasks){
	var $tasks = $(`.tasks#${name} .content`).droppable({
		greedy: true,
		drop : function(data){
			if($(data.toElement.parentElement).attr('id') != $(data.target).attr('id') && $(data.toElement).hasClass('task')){
				socket.emit('move',{
					'id':$(data.toElement).attr('id'),
					'from':$(data.toElement.parentElement).attr('id'),
					'to':$(data.target).attr('id')
				})
				$(data.toElement).css('left', 0).css('right', 0).appendTo(data.target)
			}
		}
	})
	$tasks.html('')
	for(var key in tasks){
		$tasks.append(displayTask(key,tasks[key]))
	}
}

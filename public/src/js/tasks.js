
function displayTasks(name,tasks){
	var $tasks = $('.tasks#'+name+" .content").droppable({
		greedy: true,
		drop : function(data){
			if($(data.srcElement.parentElement).attr('id') != $(data.target).attr('id')){
				socket.emit('move',{
					'element':$(data.srcElement).attr('id'),
					'from':$(data.srcElement.parentElement).attr('id'),
					'to':$(data.target).attr('id')
				});
				$(data.srcElement).css('left',"0px").css('right',"0px").appendTo(data.target);
			}
		}
	});
	$tasks.html("");
	for(var key in tasks){
		$tasks.append(displayTask(key,tasks[key]));
	}
}
$(document).ready(init);

var socket = io();

function init(){
	$(document).attr('defaultTitle',$(document).attr('title'));
	$('.trash').droppable({
		greedy: true,
		drop : function(data){
			socket.emit('remove task',{
				'id': $(data.srcElement).attr('id'),
				'from': $(data.srcElement).parent().parent().attr('id')
			});
		}
	});

	$.getScript("src/js/socket.js");
	$.getScript("src/js/notify.js");

	$.getScript("src/js/task.js");
	$.getScript("src/js/tasks.js");
	$.getScript("src/js/project.js");
	
	$.getScript("src/js/popup/popup.js");
}
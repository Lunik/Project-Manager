$(document).ready(init);

var socket = io();

function init(){
	$.getScript("src/js/socket.js");

	$.getScript("src/js/task.js");
	$.getScript("src/js/tasks.js");
	$.getScript("src/js/project.js");
	
	$.getScript("src/js/popup/popup.js");
}
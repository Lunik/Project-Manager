function displayProject(project){
	$('h1.name').text(project.name);

	for(var key in project.tasks){
		displayTasks(key,project.tasks[key]);
	}
}

function changeProject(){
	var hashval = window.location.hash.substr(1);
	socket.emit('change project',hashval);
}

$(window).bind('hashchange',changeProject).trigger('hashchange');

$('.newproject').click(function(){
	var name = prompt("Nom");
	socket.emit('new project',name);
});
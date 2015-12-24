function displayProject(project){
	$('h1.name').text(project.name);

	for(var key in project.tasks){
		displayTasks(key,project.tasks[key]);
	}
}

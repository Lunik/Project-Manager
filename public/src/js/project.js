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
	var p = new Popup();
	p.init(null, null, null, null, "Nouveaux Projet", newProjectHtml(),true);
	p.draw();
	socket.emit('new project',name);
});

function newProjectHtml(){
	var $html = $('<div>').addClass('newProjectHtml');
	var $name = $('<input>').attr('type',"text").attr('name',"name").attr('placeholder',"Nom...").appendTo($html)
		.focus(function(){
			$(this).css('background-color','')
		});

	$('<input>').attr('type',"submit").attr('value',"Créer").appendTo($html).click(function(){
		if($name.val()){
			socket.emit('new project',$name.val());
			popupClose();
		} else {
			if($name.val() == ""){
				$name.css('background-color','red');
			}
		}
	});

	return $html;
}
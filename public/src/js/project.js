initPopupProject()

function displayProject(project){
	$('h1.name').text(project.name)

	for(var key in project.tasks){
		displayTasks(key,project.tasks[key])
	}
}

function changeProject(){
	var hashval = window.location.hash.substr(1)
	socket.emit('change project',hashval)
}

$(window).bind('hashchange',changeProject).trigger('hashchange')

$('.newproject').click(function(){
	$.popupjs.init({
		pos: {
			x: null,
			y: null
		},
		width: '50%',
		height: '50%',
		title: 'Nouveaux Projet',
		html: $('.popup#new_project'),
		closeBut: true
	})
	$.popupjs.draw()
	socket.emit('new project',name)
})

function initPopupProject(){
	$('.popup#new_project input[type=submit]').click(function(){
		var name = $('.popupHtml .popup#new_project input[name=name]').val()
		if(name){
			socket.emit('new project',name)
			$.popupjs.remove()
		}
	})
}

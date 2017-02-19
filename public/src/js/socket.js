socket.on('login', function (data) {
	if(data){
		$(window).attr('location',`#${data.project.name}`)
		displayProject(data.project.data)
		$(document).attr('title',`${data.project.data.name} - ${$(document).attr('defaultTitle')}`)
	}
})

socket.on('move',function(data){
	$(`.task#${data.id}`).appendTo(`.content#${data.to}`)
})

socket.on('new task',function(data){
	$(`.tasks#${data.to} .content`).append(displayTask(data.id,data.task))
})

socket.on('remove task',function(data){
	$(`.tasks#${data.from} .task#${data.id}`).remove()
})

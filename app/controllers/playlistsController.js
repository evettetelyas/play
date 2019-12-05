const Playlist = require('../models/playlist')

const create = (request, response) => {
	Playlist.findByTitle(request.body.title)
		.then((titles) => {
			if (titles[0]) {
				response.status(400).json({message: `Playlist with ${request.body.title} already exists, please rename.`})
			}
			else {
				    Playlist.create(request.body)
						.then((id) => {
							Playlist.find(parseInt(id))
								.then((list) => response.status(201).json(list))
			})
						.catch(error => response.status(400).json(error))		
				}
		})
}

const index = (request, response) => {
	Playlist.all()
	.then((lists) => response.status(200).json(lists))
	.catch(error => response.status(400).json(error))
}

const update = (request, response) => {
	Playlist.find(request.params.id)
		.then((list) => {
		if (list[0]) {
			Playlist.update(list[0].id, request.body)
				.then((revisedList) => {
					Playlist.find(revisedList)
						.then((newObj) => {
							response.status(200).json(newObj)
				})
				})
		} else {
			response.status(404).json({
				message: `Playlist not found with id ${request.params.id}`
			})
		}
	})
	.catch(() => response.status(500).json())
}

const destroy = (request, response) => {
	var id = request.params.id
	Playlist.find(id)
	.then((list) => {
		if (list[0]) {
			Playlist.destroy(id)
			.then(() => response.status(204).json())
		} else {
			response.status(404).json({
				message: `Playlist not Found with id ${id}`
			})
		}
	})
	.catch(() => response.status(500).json())
}


module.exports = 	{	create, 
						index,
						update,
						destroy
					};
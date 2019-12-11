const Playlist = require('../models/playlist')
const Favorite = require('../models/favorite')

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
	.then(async (lists) => {
		await allListsFormatter(lists)
		.then((data) => response.status(200).json(data))
	})
	.catch(error => response.status(400).json(error))
}

async function allListsFormatter(lists) {
		let mappedList = Promise.all(await lists.map (async (list) => {
		return await Playlist.allFavs(list.id)
		.then((data) => {
			let obj = {
				"id": list.id,
				"title": list.title,
				"songCount": 0,
				"songAvgRating": 0,
				"favorites": data,
				"createdAt": list.created_at,
				"updatedAt": list.updated_at
			}
			return obj
		})
	}))
	return mappedList 
}

const update = (request, response) => {
	Playlist.find(request.params.id)
		.then((list) => {
		if (list[0]) {
			Playlist.update(list[0].id, request.body["title"])
				.then((revisedList) => {
					Playlist.find(revisedList[0].id)
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

const addFav = (request, response) => {
	var idFav = request.params.idFav 
	var idList = request.params.idList 

	Playlist.addFavorite(idFav, idList)
	.then(async (idsObj) => {
		let listTitle = ''

		await Playlist.find(idsObj[0].playlist_id)
			.then((bs) => listTitle = bs[0].title)
				response.status(201).json({
				"Success": `${idsObj[0].title} has been added to ${listTitle}!`
			})
			.catch(() => response.status(400).json())
	})
	.catch(() => response.status(400).json())
}

const show = (request, response) => {
	var id = request.params.id 
	var favsArray = []

	Playlist.allFavs(id)
	.then(async (data) => {
		await favsArray.push(data)
	})
	.catch(() => response.status(400).json())

	Playlist.find(id)
	.then(async (playlist) => {
		await response.status(200).json(
			listFormatter(playlist[0], favsArray[0])
		)
	})
}

const listFormatter = (list, favs) => {
	let listSongRating = 0
	
	Playlist.avgRating(favs.length, list.id)
	.then((data) => {
		listSongRating = data 
	})

	object = {
		"id": list.id,
		"title": list.title,
		"songCount": favs.length,
		"songAvgRating": 'I NEED A FIXIN',
		"favorites" : favs,
		"createdAt": list.created_at,
		"updatedAt": list.updated_at
	}
	return object
}

const deleteFav = (request, response) => {
	var id = request.params.idFav
	Favorite.find(id)
	.then((fav) => {
		if (fav[0]) {
			Favorite.removeFromPlaylist(fav[0].id)
			.then(() => response.status(204).json())
		} else {
			response.status(404).json({
				message: `Favorite not Found with id ${id}`
			})
		}
	})
	.catch(() => response.status(500).json())
}

module.exports = 	{	create, 
						index,
						update,
						destroy,
						addFav,
						show,
						deleteFav
					};
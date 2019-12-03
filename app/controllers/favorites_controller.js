require('dotenv').config();
const Favorite = require('../models/favorite')

const create = (request, response) => {
	var fave = request.body
	var user_id = 1
	Favorite.create(user_id, fave.title, fave.artistName, fave.genre, fave.rating)
	.then(() => response.status(201).json({
		message: `${fave.title} by ${fave.artistName} has been added to your favorites`
		}))
	.catch(error => response.status(400).json(error))
}

const index = (request, response) => {
	var user_id = 1
	Favorite.userFavorites(user_id)
	.then((faves) => response.status(201).json(faves))
	.catch(error => response.status(400).json(error))
}

const show = (request, response) => {
	var id = request.params.id
	Favorite.find(id)
	.then((fave) => {
		if (fave[0]) {
			response.status(201).json(fave)
		} else {
			response.status(404).json({
				message: `Favorite not Found with id ${id}`
			})
		}
	})
	.catch(() => response.status(500).json())
}

const destroy = (request, response) => {
	var id = request.params.id
	Favorite.find(id)
	.then((fave) => {
		if (fave[0]) {
			Favorite.destroy(id)
			.then(() => response.status(204).json())
		} else {
			response.status(404).json({
				message: `Favorite not Found with id ${id}`
			})
		}
	})
	.catch(() => response.status(500).json())
}

module.exports = {
	create,
	index,
	show,
	destroy,
	}
require('dotenv').config();
const Favorite = require('../models/favorite')
var fetch = require('node-fetch');
const musixKey = process.env.MUSIX_API_KEY
let url = 'https://api.musixmatch.com/ws/1.1/'
const service = require('../services/musixApiService')


const create = (request, response) => {
	service.trackSearch(request)
	.then(json => service.formatted(json))
	.then((obj) => {
		Favorite.create(obj)
		.then((id) => {
			Favorite.find(parseInt(id))
			.then((favId) => response.status(201).json(favId))
		})
	})
	.catch(error => response.status(400).json(error))
}

const index = (request, response) => {
	var user_id = 1
	Favorite.userFavorites(user_id)
	.then((faves) => response.status(200).json(faves))
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

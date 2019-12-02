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

module.exports = {
	create,
	}
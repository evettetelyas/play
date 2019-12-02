const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const create = (user_id, title, artistName, genre, rating) => database('favorites')
	.insert({user_id: user_id, title: title, artistName: artistName, genre: genre, rating: rating})

const show = (user_id) => database('favorites')
	.where({user_id: user_id})

module.exports = {
	create,
	show,
}
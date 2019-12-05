const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const create = (obj) => database('favorites').insert(obj).returning('id')

const userFavorites = (user_id) => database('favorites')
	.where({user_id: user_id})

const find = (id) => database('favorites')
	.where({id: id})

const destroy = (id) => database('favorites')
	.del()
	.where({id: id})

const all = () => database('favorites').select()

module.exports = {
	create,
	userFavorites,
	find,
	destroy,
	all,
}

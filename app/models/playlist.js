const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const create = (obj) => database('playlists')
    .insert(obj).returning('id')

const find = (id) => database('playlists')
	.where({id: id})

const findByTitle = (title) => database('playlists')
    .where({title: title})

const update = (oldPlaylistId, newTitle) => database('playlists')
    .where({id: oldPlaylistId})
    .first()
    .update(newTitle)

const destroy = (id) => database('playlists')
	.del()
	.where({id: id})

const all = () => database('playlists')
    .select()

module.exports = {
	create,
	find,
    findByTitle,
    update,
	destroy,
	all,
}
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
    .update({ title: newTitle }, ["id"])

const destroy = (id) => database('playlists')
	.del()
	.where({id: id})

const all = () => database('playlists')
    .select()

const addFavorite = (favId, listId) => database('favorites')
    .where({id: favId})
    .update({ playlist_id: listId }, ['title', 'playlist_id'])

const findTitle = (id) => database('playlists')
    .select("title")
    .where({id: id})

const allFavs = (id) => database('favorites')
    .where({playlist_id: id})

const avgRating = (totalFavs, listId) => database('favorites')
    .where({playlist_id: listId})
    .sum('rating')
    .then((data) => {
        (parseInt(data[0].sum)/totalFavs)
    })


module.exports = {
	create,
	find,
    findByTitle,
    update,
	destroy,
	all,
    addFavorite,
    findTitle,
    allFavs,
    avgRating
}
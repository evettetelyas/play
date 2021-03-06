var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];

var indexRouter = require('./routes/index');
var favoritesController = require('./app/controllers/favorites_controller')
var playlists = require('./app/controllers/playlistsController')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/api/v1/favorites', favoritesController.create)
app.get('/api/v1/favorites', favoritesController.index)
app.get('/api/v1/favorites/:id', favoritesController.show)
app.delete('/api/v1/favorites/:id', favoritesController.destroy)
app.post('/api/v1/playlists', playlists.create)
app.get('/api/v1/playlists', playlists.index)
app.put('/api/v1/playlists/:id', playlists.update)
app.delete('/api/v1/playlists/:id', playlists.destroy)
app.post('/api/v1/playlists/:idList/favorites/:idFav', playlists.addFav)
app.get('/api/v1/playlists/:id/favorites', playlists.show)
app.delete('/api/v1/playlists/:idList/favorites/:idFav', playlists.deleteFav)

module.exports = app;

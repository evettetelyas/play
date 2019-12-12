var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
const Playlist = require('../app/models/playlist')
const Favorite = require('../app/models/favorite')

describe('Test Playlist Controller functionality', () => {
    describe('test creating a list', () => {
        it('happy path', async () => {
            let body = { "title": "TestingJamz" }
            const res = await request(app)
            .post('/api/v1/playlists')
            .send(body)

            expect(res.statusCode).toBe(201);
            expect(res.body[0].title).toBe("TestingJamz")

            Playlist.destroy(res.body[0].id)
            .then(result => result)
        })

        it('sad path', async () => {
            let list = 0;

            let body = { "title": "siqq jamz"}
            const res = await request(app)
            .post('/api/v1/playlists')
            .send(body)

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe(`Playlist with siqq jamz already exists, please rename.`)
        });
    }); 

    describe('test updating playlist', () => {
        it('test happy update path', async () => {
            const body = { "title": "Ruby is Better"}
            const playlistId = await Playlist.create({title: "Change Me"})
            const res = await request(app)
                .put(`/api/v1/playlists/${playlistId}`)
                .send(body)

            expect(res.statusCode).toBe(200);
            expect(res.body[0].title).toBe("Ruby is Better")
        })

        it('test sad update path', async () => {
            body = { "title": "Ruby is Better"}

            const res = await request(app)
                .put('/api/v1/playlists/1999')
                .send(body)

            expect(res.statusCode).toBe(404);
        })
    })

    describe('test deleting list', () => {
        it('happy path', async () => {
            const newPlaylistId = await Playlist.create({title: "delete_me"})
            const res = await request(app)
            .delete(`/api/v1/playlists/${newPlaylistId}`)

            expect(res.statusCode).toBe(204);
        }); 

        it('sad path', async () => {
            const res = await request(app)
            .delete('/api/v1/playlists/1999')

            expect(res.statusCode).toBe(404);
        }); 
    });

    describe('adding fav songs to playlist', () => {
        let fav = 0;

            Favorite.create({
                title: 'Sprint 3 Song',
                artistName: 'Evette & The Corinas',
                genre: 'Code',
                rating: 100, 
                playlist_id: 1
            })
            .then((id) => fav = id);

       it('happy path', async () => {
           const res = await request(app)
           .post(`/api/v1/playlists/1/favorites/${parseInt(fav)}`)

            expect(res.statusCode).toBe(201);
            expect(res.body).toStrictEqual({"Success": "Sprint 3 Song has been added to siqq jamz!"})
       })

       it('sad path', async () => {
           const res = await request(app)
           .post(`/api/v1/playlists/1/favorites/9976`)

            expect(res.statusCode).toBe(400);
       })
    });

    describe('Showing all fav songs on a playlist', () => {
        it('happy path', async () => {
            const res = await request(app)
            .get('/api/v1/playlists/1/favorites')

            expect(res.statusCode).toBe(200)
        })
    })

    describe('Showing all playlists', () => {
        it('happy path', async () => {
            const res = await request(app)
            .get('/api/v1/playlists')

            expect(res.statusCode).toBe(200)
            expect(res.body[0]).toHaveProperty('title')
            expect(res.body[0]).toHaveProperty('songCount')
            expect(res.body[0]).toHaveProperty('songAvgRating')
            expect(res.body[0]).toHaveProperty('favorites')

        })
    })
})
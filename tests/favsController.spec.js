var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
const Favorite = require('../app/models/favorite')

describe('Test Favorites Controller functionality', () => {
    describe('test creating a favorite', () => {
        it('happy path', async () => {
            let body = { "title": "Tweezer", "artistName": "Phish" }
            const res = await request(app)
            .post('/api/v1/favorites')
            .send(body)

            expect(res.statusCode).toBe(201);
            expect(res.body[0].title).toBe('Tweezer')
            expect(res.body[0].artistName).toBe('Phish')
            expect(res.body[0].rating).toBe(17)
            expect(res.body[0].genre).toBe('Rock')
        });

        it('sad path', async () => {
            let body = { "title": "Not happenin", "artistName": "NOPE" }
            const res = await request(app)
            .post('/api/v1/favorites')
            .send(body)

            expect(res.statusCode).toBe(400);
        }); 
    });

    describe('test getting all favorites', () => {
        it('happy path', async () => {
            const res = await request(app)
            .get('/api/v1/favorites')

            expect(res.statusCode).toBe(200);
            expect(res.body[0]).toHaveProperty('title')
            expect(res.body[0]).toHaveProperty('artistName')
            expect(res.body[0]).toHaveProperty('genre')
            expect(res.body[0]).toHaveProperty('rating')
        });
    });

        describe('test showing single favorite', () => {
            let fav = 0;

            Favorite.create({
                title: 'The JavaScript Jam',
                artistName: 'Evette & The Corinas',
                genre: 'Code',
                rating: 100, 
                playlist_id: 1
            })
            .then((id) => fav = id);
            
        it('happy path', async () => {
            const res = await request(app)
            .get(`/api/v1/favorites/${parseInt(fav)}`)

            expect(res.statusCode).toBe(200);
            expect(res.body[0]).toHaveProperty('title')
            expect(res.body[0]).toHaveProperty('artistName')
            expect(res.body[0]).toHaveProperty('genre')
            expect(res.body[0]).toHaveProperty('rating')
        });

        it('sad path', async () => {
            const res = await request(app)
            .get('/api/v1/favorites/99999')

            expect(res.statusCode).toBe(404);
        }); 
    });

    describe('test deleting favorite', () => {
        let fav = 0;

        Favorite.create({
            title: 'The JavaScript Jam',
            artistName: 'Evette & The Corinas',
            genre: 'Code',
            rating: 100, 
            playlist_id: 1
        })
        .then((id) => fav = id);

        it('happy path', async () => {
            const res = await request(app)
            .delete(`/api/v1/favorites/${parseInt(fav)}`)

            expect(res.statusCode).toBe(204);
        });

        it('sad path', async () => {
            const res = await request(app)
            .delete('/api/v1/favorites/99999')

            expect(res.statusCode).toBe(404);
        }); 
    });
});
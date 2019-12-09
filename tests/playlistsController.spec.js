// var shell = require('shelljs');
// var request = require("supertest");
// var app = require('../app');
// const Playlist = require('../app/models/playlist')

// describe('Test Playlist Controller functionality', () => {
//     describe('test creating a list', () => {
//         it('happy path', async () => {
//             let body = { "title": "My New Thingz" }
//             const res = await request(app)
//             .post('/api/v1/playlists')
//             .send(body)

//             expect(res.statusCode).toBe(201);
//             expect(res.body[0].title).toBe("My New Thingz")
//         });

//         it('sad path', async () => {
//             let list = 0;

//             let body = { "title": "siqq jamz"}
//             const res = await request(app)
//             .post('/api/v1/playlists')
//             .send(body)

//             expect(res.statusCode).toBe(400);
//             expect(res.body.message).toBe(`Playlist with siqq jamz already exists, please rename.`)
//         });
//     }); 

//     describe('test getting all playlist', () => {
//         it('happy path', async () => {
//             const res = await request(app)
//                 .get('/api/v1/playlists')

//             expect(res.statusCode).toBe(200);
//             expect(res.body[0]).toHaveProperty('title')
//         });
//     });

//     describe('test updating playlist', () => {
//         let list = 0;

//         Playlist.findByTitle("My New Thingz")
//         .then((id) => list = id[0]);

//         it('test happy update path', async () => {
//             body = { "title": "Ruby is Better"}

//             const res = await request(app)
//                 .put(`/api/v1/playlists/${list.id}`)
//                 .send(body)

//             expect(res.statusCode).toBe(200);
//             expect(res.body[0].title).toBe("Ruby is Better")
//         })

//         it('test sad update path', async () => {
//             body = { "title": "Ruby is Better"}

//             const res = await request(app)
//                 .put('/api/v1/playlists/1999')
//                 .send(body)

//             expect(res.statusCode).toBe(404);
//         })
//     })

//     describe('test deleting list', () => {
//         let list = 0;

//         const deleteFunction = Playlist.findByTitle("Ruby is Better")
//         .then((cat) => {
//             list = cat[0].id
//             return list
//         })
// console.log(deleteFunction)
//         it('happy path', async () => {
//             const res = await request(app)
//             .delete(`/api/v1/playlists/${list}`)

//             expect(res.statusCode).toBe(204);
//         });

//         it('sad path', async () => {
//             const res = await request(app)
//             .delete('/api/v1/playlists/1999')

//             expect(res.statusCode).toBe(404);
//         }); 
//     });
// });
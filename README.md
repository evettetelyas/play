# Welcome to Play

[![Build Status](https://travis-ci.com/evettetelyas/play.svg?branch=master)](https://travis-ci.com/evettetelyas/play)

[Production Site](https://playplayplay.herokuapp.com)

1. [Introduction](#intro)
1. [Initial Setup](#setup)
1. [Testing Suite](#testing)
1. [How to Use](#use)
1. [Schema Design](#schema)
1. [Tech Stack](#stack)
1. [Core Contributors](#contributors)


Welcome to Play, a paired project over 10 days during the final semester of our Turing School of Software & Design education. This application lets a user save a list of favorite songs with full CRUD functionality. The two of us sat down prior to coding to Define The Relationship for the project lifespan - the details of the DTR can be found [here](https://gist.github.com/StarPerfect/19448e290af49813056fff8a029f3f5f). The project requirements can be found [here](https://backend.turing.io/module4/projects/play/play) and the grading rubric is outlined [here](https://backend.turing.io/module4/projects/play/play_rubric).

## Initial Setup <a name="setup"></a>

To use this repo, you'll need to `clone` a copy of the code base to your own machine. Once you've done that, make sure you are in the main project directory in terminal and run `npm install`. This will install all necessary dependencies required to run the app.

### Setting up the database

You need a local Postgres database to run this application as well. We've named ours simply `play_dev`. To get this established, run `psql` from the command prompt. Once into a Postgres session, create your database by running `CREATE DATABASE play_dev;`. It should respond with `CREATE DATABASE`. Type `\q` to quit Postgres.

### Migrations

Now that you've got a local copy of the application along with a database to use, you'll need to run the migrations so your database has the necessary tables. From the command line, type:

```
knex migrate:latest
knex seed:run
```

## Testing Suite <a name="testing"></a>

Running the test suite is very simple. `npm test` will run all tests in the entire project and report out a pretty testing table with coverage details.

## How to Use <a name="use"></a>

This application utilizes external data from the MusixMatch API. Our search is based upon their [Matcher.Track.Get](https://developer.musixmatch.com/documentation/api-reference/matcher-track-get) endpoint. You'll need to [register](https://developer.musixmatch.com/signup) for an API Key with them to get this application working locally on your own machine. Once you've obtained your key, create a .env file in the main project directory. Within this file, add the following:

```
MUSIX_API_KEY=your_key_goes_here
```

Now you're ready to hit our endpoints and see this app in action!

#### POST /api/v1/favorites

To create a new favorite, use the following request parameters:

```
{ title: "We Will Rock You", artistName: "Queen" }
```

Response Body:

```
{
  "id": 1,
  "title": "We Will Rock You",
  "artistName": "Queen"
  "genre": "Rock",
  "rating": 88
}
```

If a favorite is successfully created, the item will be returned with a status code of 201. If the favorite is not successfully created, a 400 status code will be returned.

#### GET /api/v1/favorites

Returns all favorited songs currently in the database. The index of favorites will be returned in the following format:

```
[
  {
    "id": 1,
    "title": "We Will Rock You",
    "artistName": "Queen"
    "genre": "Rock",
    "rating": 88
  },
  {
    "id": 2,
    "title": "Careless Whisper",
    "artistName": "George Michael"
    "genre": "Pop",
    "rating": 93
  },
]
```

#### GET /api/v1/favorites/:id

Returns the favorite object with the specific :id you’ve passed in. A 404 is returned if the favorite is not found.

```
  {
    "id": 1,
    "title": "We Will Rock You",
    "artistName": "Queen"
    "genre": "Rock",
    "rating": 88
  }
```

#### DELETE /api/v1/favorites/:id

Will delete the favorite with the id passed in and return a 204 status code. If the favorite can’t be found, a 404 will be returned.

#### POST /api/v1/playlists

The endpoint should accept a unique title for the new playlist.

Returns the created playlist with a status code of 201 if successful.
If the playlist is not successfully created it returns a 400.

```
{
  "id": 1,
  "title": "Cleaning House",
  "createdAt": 2019-11-26T16:03:43+00:00,
  "updatedAt": 2019-11-26T16:03:43+00:00,
}
```

#### GET /api/v1/playlists

Returns all playlists currently in the database.

```
[
  {
    "id": 1,
    "title": "Cleaning House",
    "songCount": 2,
    "songAvgRating": 27.5,
    "favorites": [
                    {
                      "id": 1,
                      "title": "We Will Rock You",
                      "artistName": "Queen"
                      "genre": "Rock",
                      "rating": 25
                    },
                    {
                      "id": 4,
                      "title": "Back In Black",
                      "artistName": "AC/DC"
                      "genre": "Rock",
                      "rating": 30
                    }
                  ],
    "createdAt": 2019-11-26T16:03:43+00:00,
    "updatedAt": 2019-11-26T16:03:43+00:00
}
  {
    "id": 2,
    "title": "Running Mix",
    "songCount": 0,
    "songAvgRating": 0,
    "favorites": []
    "createdAt": 2019-11-26T16:03:43+00:00,
    "updatedAt": 2019-11-26T16:03:43+00:00
  },
]
```

#### PUT /api/v1/playlists/:id

Returns the updated playlist object with the specific :id you've passed in. Returns a 404 if the playlist is not found.

```
{
  "id": 2,
  "title": "Marathon Running Mix",
  "createdAt": 2019-11-26T16:03:43+00:00,
  "updatedAt": 2019-11-26T16:03:43+00:00
}
```

#### DELETE /api/v1/playlists/:id

Will delete the playlist with the :id passed in and returns a 204 status code.
If the playlist can't be found, it returns a 404

#### POST /api/v1/playlists/:id/favorites/:id

The endpoint should accept a playlist id and a favorite id.

Returns a success message with a status code of 201 if successful.
If the favorite is not successfully added to the playlist it returns a 400.

```
{
  "Success": "{Song Title} has been added to {Playlist Title}!"
}
```

#### GET /api/v1/playlists/id/favorites

Returns the playlist with the list of favorites

```
{
  "id": 1,
  "title": "Cleaning House",
  "songCount": 2,
  "songAvgRating": 27.5,
  "favorites" : [
                  {
                    "id": 1,
                    "title": "We Will Rock You",
                    "artistName": "Queen"
                    "genre": "Rock",
                    "rating": 25
                  },
                  {
                    "id": 4,
                    "title": "Back In Black",
                    "artistName": "AC/DC"
                    "genre": "Rock",
                    "rating": 30
                  }
               ],
    "createdAt": 2019-11-26T16:03:43+00:00,
    "updatedAt": 2019-11-26T16:03:43+00:00
}
```

#### DELETE /api/v1/playlists/:id/favorites/:id

Will delete the favorite from the playlist and returns a 204 status code.
If the favorite can't be found, it returns a 404


## Schema Design <a name="schema"></a>

![Play Schema Diagram](https://user-images.githubusercontent.com/47605558/70668261-52b7b300-1c30-11ea-86e5-cc9cd913dcdc.png)

## Tech Stack <a name="stack"></a>

[Node.js](https://nodejs.org/en/docs/)

[Express](https://expressjs.com/)

[Knex](http://knexjs.org/)

[TravisCI](https://docs.travis-ci.com/)

[Postgresql](https://www.postgresql.org/docs/)

[Heroku](https://devcenter.heroku.com/categories/reference)

## Core Contributors <a name="contributors"></a>

Evette Telyas
 - [GitHub](https://github.com/evettetelyas)
 - [LinkedIn](https://www.linkedin.com/in/evettetelyas/)

Corina Allen
 - [GitHub](https://github.com/StarPerfect)
 - [LinkedIn](https://www.linkedin.com/in/corina-allen/)

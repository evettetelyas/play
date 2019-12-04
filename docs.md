# Welcome to Play

TravisCI link and build status

1. [Introduction](#intro)
1. [Initial Setup](#setup)
1. [Testing Suite](#testing)
1. [How to Use](#use)
1. [Schema Design](#schema)
1. [Tech Stack](#stack)
1. [Core Contributors](#contributors)

## Introduction <a name="intro"></a>

Welcome to Play, a paired project over 10 days during the final semester of our immersive educational program at Turing School of Software & Design. This application lets a user save a list of favorite songs with full CRUD functionality. The two of us sat down prior to coding to 'Define The Relationship' for the project lifespan - the details of the DTR can be found [here](https://gist.github.com/StarPerfect/19448e290af49813056fff8a029f3f5f). Here are the [project requirements](https://backend.turing.io/module4/projects/play/play) provided to us for this project as well as the [evaluation rubric](https://backend.turing.io/module4/projects/play/play_rubric).

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

## How to Use <a name="use"></a>

This application utilizes external data from the MusixMatch API. Our search is based upon their [Matcher.Track.Get](https://developer.musixmatch.com/documentation/api-reference/matcher-track-get) endpoint. You'll need to [register](https://developer.musixmatch.com/signup) for an API Key with them to get this application working locally on your own machine. Once you've obtained your key, create a `.env` file in the main project directory. Within this file, add the following:

```
MUSIX_API_KEY=your_key_goes_here
```

Now you're ready to hit our endpoints and see this app in action!

## Schema Design <a name="schema"></a>

## Tech Stack <a name="stack"></a>

## Core Contributors <a name="contributors"></a>

Evette Telyas
 - [GitHub](https://github.com/evettetelyas)
 - [LinkedIn](https://www.linkedin.com/in/evettetelyas/)

Corina Allen
 - [GitHub](https://github.com/StarPerfect)
 - [LinkedIn](https://www.linkedin.com/in/corina-allen/)

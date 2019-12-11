# Welcome to Play

[Production Site](https://playplayplay.herokuapp.com)[![Build Status](https://travis-ci.com/evettetelyas/play.svg?branch=master)](https://travis-ci.com/evettetelyas/play)

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

## How to Use <a name="use"></a>

## Schema Design <a name="schema"></a>

## Tech Stack <a name="stack"></a>

## Core Contributors <a name="contributors"></a>

Evette Telyas
 - [GitHub](https://github.com/evettetelyas)
 - [LinkedIn](https://www.linkedin.com/in/evettetelyas/)

Corina Allen
 - [GitHub](https://github.com/StarPerfect)
 - [LinkedIn](https://www.linkedin.com/in/corina-allen/)

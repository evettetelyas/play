# Welcome to Play

## Getting Started

To us this repo, you'll need to `clone` a copy of the code base to your own machine. Once you've done that, make sure you are in the main project directory in terminal and run `npm install`. This will install all necessary dependencies required to run the app.

### Setting up the database

You need a local Postgres database to run this application as well. We've named ours simply `play_dev`. To get this established, run `psql` from the command prompt. Once into a Postgres session, create your database by running `CREATE DATABASE play_dev;`. It should respond with `CREATE DATABASE`. Type `\q` to quit Postgres.

### Migrations

Now that you've got a local copy of the application along with a database to use, you'll need to run the migrations so your database has the necessary tables. From the command line, type:

```
knex migrate:latest
knex seed:run
```

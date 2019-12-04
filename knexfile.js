// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/play_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/play_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://kjznojfttzploa:fbafaf64fc44cc1f6d65aec77afb31383d594321176f7c27eb3462bce4b39d0b@ec2-174-129-255-76.compute-1.amazonaws.com:5432/db8nuvgjvaa32t',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: 'postgres://fhnmpzgmrethhs:801d3e9d6fbaee5d7f7e8a9a7de26cf176e45a50ce28fb22d4de4f0833483030@ec2-174-129-255-91.compute-1.amazonaws.com:5432/d4f05rb7hlrg9g',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
};

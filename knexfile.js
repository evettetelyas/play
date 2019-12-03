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
    connection: 'postgres://woxiwslrxggldd:ba684ce5e5b06f0c150ad3fa808bbf6e402f134bca284eb04e3b907eca58add2@ec2-174-129-255-26.compute-1.amazonaws.com:5432/da8t1f6q8ghq1d',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    },
    useNullAsDefault: true
  }
};

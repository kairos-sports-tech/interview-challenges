const path = require('path');
const knex = require('knex');

const config = {
  client: 'postgresql',
  connection:
    'postgresql://postgres:postgres@localhost:5432/kairos_database_challenge',
  migrations: {
    tableName: 'migrations',
  },
  seeds: {
    directory: path.join(__dirname, '../seeds'),
  },
};

exports.config = config;

exports.connect = () => knex(config);

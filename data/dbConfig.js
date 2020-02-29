const knex = require('knex');

const configOptions = require('../knexfile').development;
// Need to change
module.exports = knex(configOptions);
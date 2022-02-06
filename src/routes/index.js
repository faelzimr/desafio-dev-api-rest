const accounts = require('./accounts');
const bearers = require('./bearers');
const operationTypes = require('./operation-types');
const operations = require('./operations');

module.exports = {
  accounts,
  bearers,
  'operation-types': operationTypes,
  operations,
};

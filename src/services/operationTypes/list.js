const { operationTypesRepository } = require('../../repositories');

module.exports = {
  list: async () => operationTypesRepository.getAll(),
};

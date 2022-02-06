const { OperationType } = require('../models');

module.exports = {
  getById(id) {
    return OperationType.findByPk(id);
  },

  getAll() {
    return OperationType.findAll();
  },
};

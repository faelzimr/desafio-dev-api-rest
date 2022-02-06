const { Operation } = require('../models');

module.exports = {
  create(obj, transaction) {
    return Operation.create(obj, { transaction });
  },

  list(options) {
    return Operation.findAndCountAll(options);
  },

  getAll(args) {
    return Operation.findAll({
      where: args,
    });
  },
};

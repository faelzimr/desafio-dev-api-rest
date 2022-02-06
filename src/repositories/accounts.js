const { Account } = require('../models');

module.exports = {
  create(obj) {
    return Account.create(obj);
  },

  get(args) {
    return Account.findOne({
      where: args,
    });
  },

  update(id, obj, transaction) {
    return Account.update(obj, {
      where: { id },
      transaction,
    });
  },
};

const { Bearer } = require('../models');

module.exports = {
  create(obj) {
    return Bearer.create(obj);
  },

  get(args) {
    return Bearer.findOne({
      where: args,
    });
  },
};

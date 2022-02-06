const httpCodes = require('http-status-codes');
const { bearersService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const response = await bearersService.create(body);
      res.status(httpCodes.CREATED).json(response);
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },
};

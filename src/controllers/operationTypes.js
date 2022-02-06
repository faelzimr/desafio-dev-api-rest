const httpCodes = require('http-status-codes');
const { operationTypesService } = require('../services');

module.exports = {
  list: async (req, res) => {
    try {
      const response = await operationTypesService.list();

      res.status(httpCodes.OK).json(response);
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
      });
    }
  },
};

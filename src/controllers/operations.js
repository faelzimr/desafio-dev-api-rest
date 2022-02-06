const httpCodes = require('http-status-codes');
const { operationsService } = require('../services');
const { validators } = require('../helpers');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const response = await operationsService.create(body);
      res.status(httpCodes.CREATED).json(response);
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },
  list: async (req, res) => {
    const {
      query: { cpf, startDate, endDate, perPage, page },
    } = req;

    try {
      const response = await operationsService.list({
        cpf,
        startDate,
        endDate,
        perPage,
        page,
      });

      validators.checkEmptyList(response.items, res, response);
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },
};

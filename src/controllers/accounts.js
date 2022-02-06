const httpCodes = require('http-status-codes');
const { accountsService } = require('../services');

module.exports = {
  create: async (req, res) => {
    try {
      const { body } = req;
      const response = await accountsService.create(body);
      res.status(httpCodes.CREATED).json(response);
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },

  get: async (req, res) => {
    try {
      const { cpf } = req.params;
      const response = await accountsService.get(cpf);

      res.status(httpCodes.OK).json(response);
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },

  updateActive: async (req, res) => {
    try {
      const { cpf } = req.params;
      await accountsService.updateActive(cpf);

      res.status(httpCodes.NO_CONTENT).set({ 'Content-Length': '0' }).send();
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },

  updateBlocked: async (req, res) => {
    try {
      const { cpf } = req.params;
      await accountsService.updateBlocked(cpf);

      res.status(httpCodes.NO_CONTENT).set({ 'Content-Length': '0' }).send();
    } catch (error) {
      res.status(error.status || httpCodes.INTERNAL_SERVER_ERROR).json({
        name: error.name,
        message: error.message,
        validation: error.validation,
      });
    }
  },
};

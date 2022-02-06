const httpCodes = require('http-status-codes');
const { bearersRepository } = require('../../repositories');
const { ApplicationError, validators, fail, checkDocBr } = require('../../helpers');

module.exports = {
  create: async (params) => {
    try {
      await validators.checkForCreatedBearer(params);

      if (!checkDocBr.isValidCpf(params.cpf)) {
        throw new ApplicationError('validation-fails', httpCodes.BAD_REQUEST, { cpf: 'cpf-invalid' });
      }

      const cpfFormatted = checkDocBr.formatCpf(params.cpf);

      const bearerExists = await bearersRepository.get({ cpf: cpfFormatted });
      if (bearerExists) {
        throw new ApplicationError('cpf-already-registered', httpCodes.CONFLICT);
      }

      return await bearersRepository.create({ ...params, cpf: cpfFormatted });
    } catch (error) {
      return fail.errorWithValidation(error);
    }
  },
};

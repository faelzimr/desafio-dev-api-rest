const httpCodes = require('http-status-codes');
const { bearersRepository, accountsRepository } = require('../../repositories');
const { ApplicationError, validators, fail, checkDocBr } = require('../../helpers');

module.exports = {
  create: async (params) => {
    try {
      await validators.checkForCreatedAccount(params);

      if (!checkDocBr.isValidCpf(params.cpf)) {
        throw new ApplicationError('validation-fails', httpCodes.BAD_REQUEST, { cpf: 'cpf-invalid' });
      }

      const cpfFormatted = checkDocBr.formatCpf(params.cpf);

      const bearer = await bearersRepository.get({ cpf: cpfFormatted });
      if (!bearer) {
        throw new ApplicationError('bearer-not-found', httpCodes.NOT_FOUND);
      }

      const bearerExists = await accountsRepository.get({ bearerId: bearer.id });
      if (bearerExists) {
        throw new ApplicationError('bearer-already-has-a-registered-account', httpCodes.CONFLICT);
      }

      const accountExists = await accountsRepository.get({
        number: params.number,
        agency: params.agency,
      });
      if (accountExists) {
        throw new ApplicationError('number-and-agency-already-registered', httpCodes.CONFLICT);
      }

      const newAccount = { ...params, cpf: cpfFormatted, bearerId: bearer.id };

      return await accountsRepository.create(newAccount);
    } catch (error) {
      return fail.errorWithValidation(error);
    }
  },
};

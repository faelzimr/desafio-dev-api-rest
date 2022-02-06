const httpCodes = require('http-status-codes');
const { bearersRepository, accountsRepository } = require('../../repositories');
const { ApplicationError, fail, checkDocBr } = require('../../helpers');

module.exports = {
  updateBlocked: async (cpf) => {
    try {
      if (!checkDocBr.isValidCpf(cpf)) {
        throw new ApplicationError('validation-fails', httpCodes.BAD_REQUEST, { cpf: 'cpf-invalid' });
      }

      const cpfFormatted = checkDocBr.formatCpf(cpf);

      const bearer = await bearersRepository.get({ cpf: cpfFormatted });
      if (!bearer) {
        throw new ApplicationError('bearer-not-found', httpCodes.NOT_FOUND);
      }

      const account = await accountsRepository.get({ bearerId: bearer.id });
      if (!account) {
        throw new ApplicationError('account-not-found', httpCodes.NOT_FOUND);
      }

      return await accountsRepository.update(account.id, { blocked: !account.blocked });
    } catch (error) {
      return fail.errorWithValidation(error);
    }
  },
};

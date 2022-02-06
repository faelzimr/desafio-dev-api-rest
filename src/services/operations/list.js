const httpCodes = require('http-status-codes');
const { Op } = require('sequelize');
const { startOfDay, endOfDay } = require('date-fns');
const { fail, validators, checkDocBr, ApplicationError } = require('../../helpers');
const { operationsRepository, bearersRepository, accountsRepository } = require('../../repositories');

module.exports = {
  async list(params) {
    try {
      const validation = await validators.checkForListOperation(params);

      if (!checkDocBr.isValidCpf(validation.cpf)) {
        throw new ApplicationError('validation-fails', httpCodes.BAD_REQUEST, { cpf: 'cpf-invalid' });
      }

      const cpfFormatted = checkDocBr.formatCpf(validation.cpf);

      const bearer = await bearersRepository.get({ cpf: cpfFormatted });
      if (!bearer) {
        throw new ApplicationError('bearer-not-found', httpCodes.NOT_FOUND);
      }

      const account = await accountsRepository.get({ bearerId: bearer.id });
      if (!account) {
        throw new ApplicationError('account-not-found', httpCodes.NOT_FOUND);
      }

      const limit = validation.perPage;

      const offset = limit * (validation.page - 1);

      const where = {
        accountId: account.id,
        createdAt: {
          [Op.between]: [startOfDay(validation.startDate), endOfDay(validation.endDate)],
        },
      };

      const options = {
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      };
      const { rows, count } = await operationsRepository.list(options);

      return {
        account,
        items: rows,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      return fail.errorWithValidation(error);
    }
  },
};

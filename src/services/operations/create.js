const httpCodes = require('http-status-codes');
const { startOfDay, endOfDay } = require('date-fns');
const { Op } = require('sequelize');
const {
  bearersRepository,
  accountsRepository,
  operationsRepository,
  operationTypesRepository,
} = require('../../repositories');
const { ApplicationError, validators, fail, checkDocBr, constant } = require('../../helpers');
const db = require('../../models');

module.exports = {
  create: async (params) => {
    try {
      const validation = await validators.checkForCreatedOperation(params);

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

      if (!account.active) {
        throw new ApplicationError('inactive-account', httpCodes.UNPROCESSABLE_ENTITY);
      }

      if (account.blocked) {
        throw new ApplicationError('blocked-account', httpCodes.UNPROCESSABLE_ENTITY);
      }

      const operationType = await operationTypesRepository.getById(validation.operationTypeId);
      if (!operationType) {
        throw new ApplicationError('operationTypeId-not-found', httpCodes.NOT_FOUND);
      }

      let { value } = validation;
      let balance = parseFloat(account.balance) * 100;
      value *= 100;
      if (operationType.name === constant.operationType.withdraw) {
        if (balance < value) {
          throw new ApplicationError('insufficient-funds', httpCodes.UNPROCESSABLE_ENTITY);
        }
        const date = new Date();

        const dayOperations = await operationsRepository.getAll({
          createdAt: {
            [Op.between]: [startOfDay(date), endOfDay(date)],
          },
          operationTypeId: operationType.id,
          accountId: account.id,
        });

        let withDrawalDay = 0;
        dayOperations.forEach((operation) => {
          withDrawalDay += parseFloat(operation.value) * -100;
        });

        if ((value + withDrawalDay) / 100 > 2000) {
          throw new ApplicationError('daily-limit', httpCodes.UNPROCESSABLE_ENTITY, {
            available: (200000 - withDrawalDay) / 100,
          });
        }

        balance = (balance - value) / 100;
        value = (value * -1) / 100;
      } else {
        balance = (balance + value) / 100;
        value /= 100;
      }

      return db.sequelize.transaction(async (transaction) => {
        await accountsRepository.update(account.id, { balance }, transaction);

        return operationsRepository.create(
          {
            operationTypeId: operationType.id,
            accountId: account.id,
            value,
            currentBalance: balance,
          },
          transaction,
        );
      });
    } catch (error) {
      return fail.errorWithValidation(error);
    }
  },
};

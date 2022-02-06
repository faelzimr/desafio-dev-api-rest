const httpCodes = require('http-status-codes');
const ApplicationError = require('./ApplicationError');

const errorWithValidation = (error) => {
  console.error(error);
  if (error.name === 'ValidationError') {
    const validation = {};
    error.inner.forEach((erro) => {
      validation[erro.path] = erro.message;
    });
    throw new ApplicationError('validation-fails', httpCodes.BAD_REQUEST, validation);
  }
  throw error;
};

module.exports = {
  errorWithValidation,
};

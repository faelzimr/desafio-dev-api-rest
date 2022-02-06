const httpCodes = require('http-status-codes');

module.exports = class ApplicationError extends Error {
  /**
   * @param  {string} message
   * @param  {integer} status
   * @param  {object} validation
   */
  constructor(message, status, validation = {}) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = status || httpCodes.INTERNAL_SERVER_ERROR;

    if (status === httpCodes.BAD_REQUEST || message === 'daily-limit') {
      this.validation = validation;
    }
  }
};

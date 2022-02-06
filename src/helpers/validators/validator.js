const httpCodes = require('http-status-codes');

const checkEmptyList = (data, res, response) => {
  if (data.length === 0) {
    return res.status(httpCodes.NO_CONTENT).set({ 'Content-Length': '0' }).send();
  }
  return res.status(httpCodes.OK).json(response);
};

module.exports = {
  checkEmptyList,
};

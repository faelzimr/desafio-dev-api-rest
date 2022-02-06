const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

const docs = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename)
  .reduce((previous, current) => {
    // eslint-disable-next-line
    const file = require(path.join(__dirname, current));
    Object.assign(previous, file);
    return previous;
  }, {});

const options = {
  swaggerOptions: {
    docExpansion: 'none',
  },
};

module.exports = {
  docs,
  options,
};

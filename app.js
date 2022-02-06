const { logger } = require('./src/utils');
const { sequelize } = require('./src/models');

const server = require('./src/config/express');

const port = process.env.PORT || 3000;
const version = process.env.VERSION || 'v1';
const enviroment = process.env.NODE_ENV || 'development';

sequelize
  .sync({})
  .then(() => {
    server.listen(port, () => {
      if (process.env.NODE_ENV !== 'test') {
        logger.info(`Server is running on port ${port} (${enviroment})`);

        console.info(`\nDocumentation: http://localhost:3000/api/${version}/documentation \n`);
      }
    });
  })
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  });

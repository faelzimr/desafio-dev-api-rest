require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.NODE_ENV === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST,
  username: process.env.NODE_ENV === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER,
  password: process.env.NODE_ENV === 'test' ? process.env.DB_PASS_TEST : process.env.DB_PASS_DEV,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  logging: process.env.NODE_ENV === 'production',
  dialectOptions: {
    connectTimeout: 60000,
  },
  benchmark: true,
};

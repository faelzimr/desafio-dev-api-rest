require('dotenv/config');

module.exports = {
  baseUrl: process.env.BASE_URL,
  version: process.env.VERSION,
  secret: process.env.SECRET,
  enviroment: process.env.NODE_ENV,
  corsOptions: {
    origin: process.env.ORIGIN,
    methods: process.env.METHODS,
    optionsSuccessStatus: process.env.OPTIONS_SUCCESS_STATUS,
  },
};

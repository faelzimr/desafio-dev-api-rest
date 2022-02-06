const cors = require('cors');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const morgan = require('morgan');

const server = require('http').Server(app);

const { version, corsOptions } = require('./env');
const routes = require('../routes');
const swaggerConfig = require('./swagger');

app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.set('port', process.env.PORT);

app.use(`/api/${version}/documentation`, swagger.serve);
app.use(`/api/${version}/documentation`, swagger.setup(swaggerConfig.docs, swaggerConfig.options));

Object.keys(routes).forEach((key) => app.use(`/api/${version}/${key}`, routes[key]));

module.exports = server;

const winston = require('winston');

const { createLogger, format, transports } = winston;

const path = require('path');

const LOG_FOLDER = path.resolve(process.cwd(), 'logs');

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    http: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    http: 'magenta',
  },
};

winston.addColors(config.colors);

const logger = createLogger({
  levels: config.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),

  transports: [
    new transports.File({
      filename: path.join(LOG_FOLDER, './error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(LOG_FOLDER, './warn.log'),
      level: 'warn',
    }),
    new transports.File({
      filename: path.join(LOG_FOLDER, './info.log'),
      level: 'info',
    }),
    new transports.File({
      filename: path.join(LOG_FOLDER, './http.log'),
      level: 'http',
    }),
    new transports.File({
      filename: path.join(LOG_FOLDER, './combined.log'),
    }),
    new transports.File({ filename: path.join(LOG_FOLDER, './combined.log') }),
  ],
  level: 'http',
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      levels: config.levels,
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp({
          format: 'HH:mm:ss',
        }),
        format.printf((info) => `> [${info.timestamp}] [${info.level}]: ${info.message}`),
      ),
      level: 'http',
    }),
  );
}

module.exports = logger;

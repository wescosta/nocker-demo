import winston from "winston";

const PATH = 'logs',
      { createLogger, format, transports } = winston;

export default createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(format.colorize(), format.simple()),
  transports: [
    new transports.File({ filename: `${PATH}/error.log`, level: 'error' }),
    new transports.File({ filename: `${PATH}/all.log` }),
    new transports.Console({level: 'debug'})
  ]
})
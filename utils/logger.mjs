import { createLogger, format, transports } from "winston";

const PATH = 'logs';

export default  winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(format.colorize(), format.json()),
  transports: [
    new transports.File({ filename: `${PATH}/error.log`, level: 'error' }),
    new transports.File({ filename: `${PATH}/all.log` }),
    new transports.Console({level: 'debug'})
  ]
})
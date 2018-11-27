import winston from "winston";

const PATH = 'logs';

export default  winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: `${PATH}/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${PATH}/all.log` })
  ]
});
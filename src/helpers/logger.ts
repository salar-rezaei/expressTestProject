import { info } from "console";
import winston, { level } from "winston";

export default winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                winston.format.simple()

            )
        }),
        new winston.transports.File({filename : './logs/error.log', level: 'error', maxFiles: 4, maxsize: 100}),
        new winston.transports.File({filename : './logs/info.log', level: 'info'}),
        new winston.transports.File({filename : './logs/warn.log', level: 'warn', maxFiles: 4, maxsize: 100}),
    ]
})
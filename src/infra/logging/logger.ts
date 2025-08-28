// @ts-ignore
import WinstonLimit from "@redpill-paris/winston-limit-transport";
import type { LoggerOptions } from "winston";
import winston from "winston";
import { formatUppercaseLevel } from "~/infra/logging/formatters";

const loggerOptions = {
  levels: winston.config.npm.levels,
  level: "debug",
  format: winston.format.combine(
    formatUppercaseLevel(),
    winston.format.colorize(),
    winston.format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    winston.format.align(),
    winston.format.printf((info) => {
      return `${info.level} ${info.timestamp}: ${info.message}`;
    })
  ),
  transports: [
    new WinstonLimit({
      timeout: 2000,
      transport: new winston.transports.Console({
        handleExceptions: true,
      }),
    }),
  ],
} as LoggerOptions;

const logger = winston.createLogger(loggerOptions);
export default logger;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const winston_limit_transport_1 = __importDefault(require("@redpill-paris/winston-limit-transport"));
const winston_1 = __importDefault(require("winston"));
const formatters_1 = require("./formatters");
const loggerOptions = {
    levels: winston_1.default.config.npm.levels,
    level: "debug",
    format: winston_1.default.format.combine((0, formatters_1.formatUppercaseLevel)(), winston_1.default.format.colorize(), winston_1.default.format.timestamp({
        format: "DD-MM-YYYY HH:mm:ss",
    }), winston_1.default.format.align(), winston_1.default.format.printf((info) => {
        return `${info.level} ${info.timestamp}: ${info.message}`;
    })),
    transports: [
        new winston_limit_transport_1.default({
            timeout: 2000,
            transport: new winston_1.default.transports.Console({
                handleExceptions: true,
            }),
        }),
    ],
};
const logger = winston_1.default.createLogger(loggerOptions);
exports.default = logger;
//# sourceMappingURL=logger.js.map
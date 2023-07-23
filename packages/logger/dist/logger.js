"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, colorize, printf } = winston_1.format;
class Logger {
    constructor() {
        this.levels = { error: 0, warn: 1, info: 2, http: 3, debug: 4 };
        this.colors = { error: 'red', warn: 'yellow', info: 'green', http: 'magenta', debug: 'white' };
        this.env = process.env.NODE_ENV || 'development';
        this.isDevelopment = this.env === 'development';
        (0, winston_1.addColors)(this.colors);
    }
    level() {
        return this.isDevelopment ? 'debug' : 'warn';
    }
    logFormat() {
        return combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), colorize({ all: true }), printf(info => `${info.timestamp} ${info.level}: ${info.message}`));
    }
    getTransports() {
        const transport1 = new winston_daily_rotate_file_1.default({
            filename: 'logs/app-%DATE%.log',
            auditFile: 'logs/app.json',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '1d',
        });
        const transport2 = new winston_daily_rotate_file_1.default({
            level: 'http',
            filename: 'logs/request-%DATE%.log',
            auditFile: 'logs/request.json',
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '1d',
        });
        const transport3 = new winston_1.transports.File({
            level: 'error',
            filename: 'logs/error.log',
        });
        return [new winston_1.transports.Console(), transport1, transport2, transport3];
    }
    createLogger() {
        return (0, winston_1.createLogger)({
            level: this.level(),
            levels: this.levels,
            format: this.logFormat(),
            defaultMeta: { service: 'auth-service' },
            transports: this.getTransports(),
        });
    }
}
const logger = new Logger().createLogger();
exports.logger = logger;
//# sourceMappingURL=logger.js.map
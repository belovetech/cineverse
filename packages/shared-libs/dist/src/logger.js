"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, colorize, printf } = winston_1.format;
class Logger {
    constructor() {
        var _a;
        this.colors = {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'magenta',
            debug: 'white',
        };
        this.env = (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
        this.isDevelopment = this.env === 'development';
    }
    logFormat() {
        return combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), colorize({ all: true }), printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
    }
    getTransports() {
        const commonTransporOptions = {
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '50m',
            maxFiles: '14d',
        };
        const transport1 = new winston_daily_rotate_file_1.default(Object.assign({ level: 'info', filename: 'logs/app-%DATE%.log', auditFile: 'logs/app.json' }, commonTransporOptions));
        const transport2 = new winston_daily_rotate_file_1.default(Object.assign({ level: 'error', filename: 'logs/error-%DATE%.log', auditFile: 'logs/error.json' }, commonTransporOptions));
        const transport3 = new winston_daily_rotate_file_1.default(Object.assign({ filename: 'logs/other-%DATE%.log', auditFile: 'logs/other.json' }, commonTransporOptions));
        return [new winston_1.transports.Console(), transport1, transport2, transport3];
    }
    createLogger() {
        (0, winston_1.addColors)(this.colors);
        return (0, winston_1.createLogger)({
            level: this.isDevelopment ? 'debug' : 'warn',
            format: this.logFormat(),
            transports: this.getTransports(),
        });
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map
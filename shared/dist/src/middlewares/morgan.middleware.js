"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@cineverse/logger");
const morgan_1 = __importDefault(require("morgan"));
function customMorgan() {
    const stream = {
        write: message => logger_1.logger.http(message),
    };
    const skip = () => {
        const env = process.env.NODE_ENV || "development";
        return env !== "development";
    };
    const format = ":method :url :status :res[content-length] - :response-time ms";
    return (0, morgan_1.default)(format, { stream, skip });
}
exports.default = customMorgan;
//# sourceMappingURL=morgan.middleware.js.map
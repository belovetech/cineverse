"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const libs_1 = __importDefault(require("@cineverse/libs"));
const errorMiddleware = (err, req, res, next) => {
    try {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        const name = err.name || 'InternalServerError';
        libs_1.default.info(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, message:: ${message}`);
        if (err.name === 'ValidationException') {
            const parsedMessage = JSON.parse(message);
            return res.status(statusCode).json(Object.assign({ statusCode, name }, parsedMessage));
        }
        return res.status(statusCode).json({ statusCode, name, error: message });
    }
    catch (error) {
        return next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map
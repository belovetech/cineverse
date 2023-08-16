"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@cineverse/logger");
function errorMiddleware(err, req, res, next) {
    try {
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        const name = err.name || "InternalServerError";
        logger_1.logger.info(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, message:: ${message}`);
        if (err.name === "ValidationException") {
            const parsedMessage = JSON.parse(message);
            return res.status(statusCode).json(Object.assign({ statusCode, name }, parsedMessage));
        }
        return res.status(statusCode).json({ statusCode, name, error: message });
    }
    catch (error) {
        return next(error);
    }
}
exports.default = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map
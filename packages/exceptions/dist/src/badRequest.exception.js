"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const exceptions_1 = require("./exceptions");
class BadRequestException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 400;
        this.message = message || 'Bad Request:: Invalid request payload';
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=badRequest.exception.js.map
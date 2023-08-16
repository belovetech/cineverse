"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const exceptions_1 = require("./exceptions");
class ValidationException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 400;
        this.message = message || 'Bad Request:: Invalid request payload';
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map
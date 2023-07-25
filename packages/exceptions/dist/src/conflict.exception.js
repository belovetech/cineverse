"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
const exceptions_1 = require("./exceptions");
class ConflictException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 409;
        this.message = message || 'Conflict:: Customer already exists.';
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=conflict.exception.js.map
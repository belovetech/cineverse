"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationException = void 0;
const exceptions_1 = require("./exceptions");
class AuthenticationException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 401;
        this.message = message || 'Unauthorized:: Authentication failed';
    }
}
exports.AuthenticationException = AuthenticationException;
//# sourceMappingURL=authentication.exception.js.map
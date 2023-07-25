"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const exceptions_1 = require("./exceptions");
class ForbiddenException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 403;
        this.message = message || 'Forbidden:: Unauthorized';
    }
}
exports.ForbiddenException = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map
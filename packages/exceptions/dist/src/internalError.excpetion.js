"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = void 0;
const exceptions_1 = require("./exceptions");
class InternalServerException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 500;
        this.message = message || 'Server Error:: Internal Server Error';
    }
}
exports.InternalServerException = InternalServerException;
//# sourceMappingURL=internalError.excpetion.js.map
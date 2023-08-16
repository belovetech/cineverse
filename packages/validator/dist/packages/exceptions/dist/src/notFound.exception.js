"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const exceptions_1 = require("./exceptions");
class NotFoundException extends exceptions_1.Exception {
    constructor(message, statusCode) {
        super(statusCode, message);
        this.statusCode = 404;
        this.message = message || 'Not found:: Customer not found';
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=notFound.exception.js.map
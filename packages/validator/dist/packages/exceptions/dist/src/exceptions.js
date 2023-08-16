"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.name = this.constructor.name;
    }
}
exports.Exception = Exception;
//# sourceMappingURL=exceptions.js.map
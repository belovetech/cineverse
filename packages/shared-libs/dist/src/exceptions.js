"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = exports.ForbiddenException = exports.ConflictException = exports.BadRequestException = exports.AuthenticationException = exports.Exception = void 0;
class Exception extends Error {
    constructor(message) {
        super(message);
        this.message = message !== null && message !== void 0 ? message : 'ServerError:: Something went wrong';
        this.statusCode = 500;
        this.name = this.constructor.name;
    }
}
exports.Exception = Exception;
class AuthenticationException extends Exception {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.message = message !== null && message !== void 0 ? message : 'Unauthorized:: Authentication failed';
    }
}
exports.AuthenticationException = AuthenticationException;
class BadRequestException extends Exception {
    constructor(message) {
        if (typeof message === 'object')
            message = JSON.stringify(message);
        super(message);
        this.statusCode = 400;
        this.message = message !== null && message !== void 0 ? message : 'BadRequest:: Invalid request payload';
    }
}
exports.BadRequestException = BadRequestException;
class ConflictException extends Exception {
    constructor(message) {
        super(message);
        this.statusCode = 409;
        this.message = message !== null && message !== void 0 ? message : 'Conflict:: Customer already exists.';
    }
}
exports.ConflictException = ConflictException;
class ForbiddenException extends Exception {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.message = message !== null && message !== void 0 ? message : 'Forbidden:: Unauthorized';
    }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends Exception {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.message = message !== null && message !== void 0 ? message : 'NotFound:: User not found';
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=exceptions.js.map
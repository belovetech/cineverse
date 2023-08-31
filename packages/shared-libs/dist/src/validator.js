"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
class Validator {
    constructor(payload) {
        this.errorCounter = 0;
        this.payload = payload;
        this.errors = {};
        this.keys = Object.keys(payload);
    }
    isValidKey(key) {
        return this.keys.includes(key);
    }
    printErrors() {
        const message = {
            message: `You have (${this.errorCounter}) errors to fix`,
            errors: Object.assign({}, this.errors),
        };
        throw new exceptions_1.BadRequestException(message);
    }
    validateString(key, value) {
        if (!value || typeof value !== 'string' || value.trim().length < 3) {
            this.addError({ [key]: `Please provide a valid ${[key]}` });
        }
    }
    validateNumber(key, value) {
        if (!value || typeof value !== 'number' || isNaN(value)) {
            this.addError({ [key]: `Please provide a valid ${[key]}` });
        }
    }
    validateEmail(key, value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== 'string' || !emailRegex.test(value)) {
            this.addError({ [key]: `Please provide a valid ${[key]}` });
        }
    }
    validatePassword(key, value) {
        const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=]).{7,}$/;
        if (!value || !passwordRegex.test(value)) {
            this.addError({ [key]: 'Please provide a strong password' });
        }
    }
    validateUUIDv4(key, uuid) {
        const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if (!uuidRegex.test(uuid)) {
            this.addError({ [key]: `Please provide a valid ${[key]}` });
        }
    }
    addError(error) {
        this.errors = Object.assign(Object.assign({}, this.errors), error);
        this.errorCounter = Object.keys(this.errors).length;
    }
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map
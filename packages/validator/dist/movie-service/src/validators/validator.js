"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("@cineverse/exceptions");
const KEYS = ['title', 'genre', 'description', 'duration'];
class Validator {
    constructor(payload) {
        this.payload = payload;
        this.errors = {};
    }
    isValidKey(key) {
        return Object.keys(this.payload).includes(key);
    }
    printErrors() {
        const message = { message: `You have (${this.errorCounter}) errors to fix`, errors: Object.assign({}, this.errors) };
        throw new exceptions_1.ValidationException(JSON.stringify(message));
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
    validateUnknownType() {
        for (const key in this.payload) {
            if (!KEYS.includes(key)) {
                this.addError({ [key]: `${[key]} is not part of the required data` });
            }
        }
    }
    addError(error) {
        this.errors = Object.assign(Object.assign({}, this.errors), error);
        this.errorCounter = Object.keys(this.errors).length;
    }
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map
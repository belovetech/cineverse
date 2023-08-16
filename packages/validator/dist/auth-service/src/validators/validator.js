"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("@cineverse/exceptions");
class Validator {
    constructor(payload) {
        this.errorCounter = 0;
        this.payload = payload;
        this.validates = [];
    }
    isValidKey(key) {
        return Object.keys(this.payload).includes(key);
    }
    printErrors() {
        const message = { message: `You have (${this.errorCounter}) errors to fix`, errors: this.validates };
        throw new exceptions_1.ValidationException(JSON.stringify(message));
    }
    validateString(key, value) {
        if (!value || typeof value !== "string" || value.trim().length < 3) {
            this.validates.push({ [key]: "Please provide a valid string" });
            this.errorCounter += 1;
        }
    }
    validateNumber(key, value) {
        if (!value || typeof value !== "number" || isNaN(value)) {
            this.validates.push({ [key]: "Please provide a valid number [0-9]" });
            this.errorCounter += 1;
        }
    }
    validateEmail(key, value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== "string" || !emailRegex.test(value)) {
            this.validates.push({ [key]: "Please provide a valid email" });
            this.errorCounter += 1;
        }
    }
    validateUnknownType(key) {
        this.validates.push({ [key]: "Please provide a required data" });
        this.errorCounter += 1;
    }
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map
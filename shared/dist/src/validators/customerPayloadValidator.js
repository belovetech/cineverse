"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDataValidator = void 0;
const validator_1 = __importDefault(require("@validators/validator"));
class CustomerDataValidator extends validator_1.default {
    constructor(payload) {
        super(payload);
    }
    validate() {
        this.validateString("firstName", this.payload.firstName);
        this.validateString("lastName", this.payload.lastName);
        this.validateEmail("email", this.payload.email);
        this.validatePassword("password", this.payload.password);
        for (const key in this.payload) {
            if (!this.isValidKey(key)) {
                this.validateUnknownType(key);
            }
        }
        if (this.errorCounter > 0) {
            this.printErrors();
        }
    }
    validatePassword(key, value) {
        const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=]).{7,}$/;
        if (!value || !passwordRegex.test(value)) {
            this.validates.push({ [key]: "Please provide a strong password" });
            this.errorCounter += 1;
        }
        if (!this.payload.passwordConfirm || this.payload.passwordConfirm !== value) {
            this.validates.push({ passwordConfirm: "Password must be the same" });
            this.errorCounter += 1;
        }
    }
}
exports.CustomerDataValidator = CustomerDataValidator;
//# sourceMappingURL=customerPayloadValidator.js.map
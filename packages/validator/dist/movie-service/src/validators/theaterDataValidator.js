"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheaterDataValidator = void 0;
const validator_1 = __importDefault(require("@validators/validator"));
class TheaterDataValidator extends validator_1.default {
    validate() {
        this.validateString('name', this.payload.name);
        this.validateString('location', this.payload.location);
        this.validateNumber('seatingCapacity', this.payload.seatingCapacity);
        for (const key in this.payload) {
            if (Object.prototype.hasOwnProperty.call(this.payload, key) && !this.isValidKey(key)) {
                this.validateUnknownType(key);
            }
        }
        if (this.errorCounter > 0) {
            this.printErrors();
        }
    }
}
exports.TheaterDataValidator = TheaterDataValidator;
//# sourceMappingURL=theaterDataValidator.js.map
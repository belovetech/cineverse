"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheaterDataValidator = void 0;
const libs_1 = __importDefault(require("@cineverse/libs"));
class TheaterDataValidator extends libs_1.default {
    validate() {
        this.validateString('name', this.payload.name);
        this.validateString('location', this.payload.location);
        this.validateNumber('seatingCapacity', this.payload.seatingCapacity);
        if (this.errorCounter > 0) {
            this.printErrors();
        }
    }
}
exports.TheaterDataValidator = TheaterDataValidator;
//# sourceMappingURL=theaterDataValidator.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatDataValidator = void 0;
const seat_dto_1 = require("@dtos/seat.dto");
const libs_1 = __importDefault(require("@cineverse/libs"));
class SeatDataValidator extends libs_1.default {
    validate() {
        this.validateSeatNumber(this.payload.seatNumber);
        this.validateRowNumber(this.payload.rowNumber);
        this.validateEnum(this.payload.status);
        this.validateUUIDv4('theaterId', this.payload.theaterId);
        if (this.errorCounter > 0) {
            this.printErrors();
        }
    }
    validateSeatNumber(seatNumber) {
        const seatNumberREgex = /^\d+$/;
        if (!seatNumber || !seatNumberREgex.test(seatNumber)) {
            this.addError({ seatNumber: 'Please provide a valid seat Number' });
        }
    }
    validateRowNumber(rowNumber) {
        const rowNumberREgex = /^[A-Z]+$/;
        if (!rowNumber || !rowNumberREgex.test(rowNumber)) {
            this.addError({ rowNumber: 'Please provide a valid row Number' });
        }
    }
    validateEnum(status) {
        if (!Object.values(seat_dto_1.Status).includes(status)) {
            this.addError({ status: 'Please provide a valid seat status' });
        }
    }
}
exports.SeatDataValidator = SeatDataValidator;
//# sourceMappingURL=seatDataValidator.js.map
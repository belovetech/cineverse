"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowtimeDataValidator = void 0;
const libs_1 = __importDefault(require("@cineverse/libs"));
class ShowtimeDataValidator extends libs_1.default {
    validate() {
        this.validateTime(this.payload.startTime, this.payload.endTime);
        this.validateDate(this.payload.date);
        this.validateUUIDv4('movieId', this.payload.movieId);
        this.validateUUIDv4('theaterId', this.payload.theaterId);
        if (this.errorCounter > 0) {
            this.printErrors();
        }
    }
    validateTime(startTime, endTime) {
        var _a, _b;
        const timeRegex = /^(0\d|1\d|2[0-3]):[0-5]\d$/;
        if (!startTime || !timeRegex.test(startTime)) {
            this.addError({ startTime: 'Please provide a valid start Time' });
        }
        if (!endTime || !timeRegex.test(endTime)) {
            this.addError({ endTime: 'Please provide a valid end Time' });
        }
        const startParts = (_a = startTime === null || startTime === void 0 ? void 0 : startTime.split(':')) !== null && _a !== void 0 ? _a : [];
        const endParts = (_b = endTime === null || endTime === void 0 ? void 0 : endTime.split(':')) !== null && _b !== void 0 ? _b : [];
        if ((startParts === null || startParts === void 0 ? void 0 : startParts.length) !== 2 || (endParts === null || endParts === void 0 ? void 0 : endParts.length) !== 2) {
            this.addError({ time: 'Invalid start and end Time' });
        }
        const [startHour, startMinute] = startParts.map(part => parseInt(part, 10));
        const [endHour, endMinute] = endParts.map(part => parseInt(part, 10));
        if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
            this.addError({ time: 'Start time must be before end time' });
        }
    }
    validateDate(date) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!date || !dateRegex.test(date)) {
            this.addError({ date: 'Please provide a valid date' });
        }
        else {
            const [year, month, day] = date.split('-').map(part => parseInt(part, 10));
            const currentDate = new Date();
            const inputDate = new Date(year, month - 1, day);
            if (month < 1 || month > 12 || day < 1 || day > 31) {
                this.addError({ date: 'Month or day out of range' });
            }
            if (inputDate < currentDate) {
                this.addError({ date: 'Date is in the past' });
            }
        }
    }
}
exports.ShowtimeDataValidator = ShowtimeDataValidator;
//# sourceMappingURL=showtimeDataValidator.js.map
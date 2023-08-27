"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const libs_1 = require("@cineverse/libs");
const seatDataValidator_1 = require("@validators/seatDataValidator");
const _respositories_1 = require("@respositories");
class SeatService {
    createSeat(seat) {
        return __awaiter(this, void 0, void 0, function* () {
            new seatDataValidator_1.SeatDataValidator(seat).validate();
            const seatExist = yield _respositories_1.seatRepository.findOne({ where: Object.assign({}, seat) });
            if (seatExist)
                throw new libs_1.ConflictException('seat already exist');
            const newSeat = yield _respositories_1.seatRepository.create(seat);
            return newSeat;
        });
    }
    getSeats(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _respositories_1.seatRepository.findAll(reqQuery);
        });
    }
    getSeat(seatId) {
        return __awaiter(this, void 0, void 0, function* () {
            const seat = yield _respositories_1.seatRepository.findByPk(seatId);
            if (seat === null)
                throw new libs_1.NotFoundException('Seat not found');
            return seat;
        });
    }
}
exports.default = SeatService;
//# sourceMappingURL=seat.service.js.map
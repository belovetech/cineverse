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
const showtimeDataValidator_1 = require("@validators/showtimeDataValidator");
const _respositories_1 = require("@respositories");
class ShowtimeService {
    createShowtime(showtime) {
        return __awaiter(this, void 0, void 0, function* () {
            new showtimeDataValidator_1.ShowtimeDataValidator(showtime).validate();
            const { startTime, endTime, theaterId } = showtime;
            const showtimeExist = yield _respositories_1.showtimeRepository.findOne({ where: { startTime, endTime, theaterId } });
            if (showtimeExist)
                throw new libs_1.ConflictException('Show time already exist');
            const newShowtime = yield _respositories_1.showtimeRepository.create(showtime);
            return newShowtime;
        });
    }
    getShowtimes(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _respositories_1.showtimeRepository.findAll(reqQuery);
        });
    }
    getShowtime(showTimeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const showtime = yield _respositories_1.showtimeRepository.findByPk(showTimeId);
            if (showtime === null)
                throw new libs_1.NotFoundException('Show time not found');
            return showtime;
        });
    }
}
exports.default = ShowtimeService;
//# sourceMappingURL=showtime.service.js.map
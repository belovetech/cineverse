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
const exceptions_1 = require("@cineverse/exceptions");
const theaterDataValidator_1 = require("@validators/theaterDataValidator");
const _respositories_1 = require("@respositories");
class TheaterService {
    createTheater(theaterData) {
        return __awaiter(this, void 0, void 0, function* () {
            new theaterDataValidator_1.TheaterDataValidator(theaterData).validate();
            const isTheaterExist = yield _respositories_1.theaterRepository.getTheater({ where: { name: theaterData.name } });
            if (isTheaterExist)
                throw new exceptions_1.ConflictException('Theater already exist');
            const newTheater = yield _respositories_1.theaterRepository.createTheather(theaterData);
            return newTheater;
        });
    }
    getTheaters(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _respositories_1.theaterRepository.getTheaters(reqQuery);
        });
    }
    getTheater(theaterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _respositories_1.theaterRepository.getTheaterById(theaterId);
        });
    }
}
exports.default = TheaterService;
//# sourceMappingURL=theater.service.js.map
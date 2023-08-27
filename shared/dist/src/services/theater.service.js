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
const theaterDataValidator_1 = require("@validators/theaterDataValidator");
const _respositories_1 = require("@respositories");
class TheaterService {
    createTheater(theaterData) {
        return __awaiter(this, void 0, void 0, function* () {
            new theaterDataValidator_1.TheaterDataValidator(theaterData).validate();
            const isTheaterExist = yield _respositories_1.theaterRepository.findOne({ where: { name: theaterData.name } });
            if (isTheaterExist)
                throw new libs_1.ConflictException('Theater already exist');
            return yield _respositories_1.theaterRepository.create(theaterData);
        });
    }
    getTheaters(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _respositories_1.theaterRepository.findAll(reqQuery);
        });
    }
    getTheater(theaterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const theater = yield _respositories_1.theaterRepository.findTheaterWithAssociates(theaterId);
            if (theater === null)
                throw new libs_1.NotFoundException('Theater not found');
            return theater;
        });
    }
}
exports.default = TheaterService;
//# sourceMappingURL=theater.service.js.map
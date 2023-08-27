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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = __importDefault(require("@utils/formatter"));
const libs_1 = __importDefault(require("@cineverse/libs"));
const _services_1 = require("@services");
const links_1 = require("@utils/links");
class ShowtimeController {
    createshowtime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const showtimeData = req.body;
                const showtime = yield _services_1.showtimeService.createShowtime(showtimeData);
                const response = new formatter_1.default(showtime, links_1.showtimeLinks.post);
                return res.status(201).json(response.format());
            }
            catch (error) {
                libs_1.default.error('Createshowtime', error);
                return next(error);
            }
        });
    }
    getshowtime(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const showtime = yield _services_1.showtimeService.getShowtime((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                const response = new formatter_1.default(showtime, links_1.showtimeLinks.get);
                return res.status(200).json(response.format());
            }
            catch (error) {
                libs_1.default.error('Getshowtime', error);
                return next(error);
            }
        });
    }
    getShowtimes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { showtimes, metadata } = yield _services_1.showtimeService.getShowtimes(req.query);
                const response = showtimes.map(showtime => new formatter_1.default(showtime).format());
                return res.status(200).json({ metadata, data: response });
            }
            catch (error) {
                libs_1.default.error('GetShowtimes', error);
                return next(error);
            }
        });
    }
}
exports.default = ShowtimeController;
//# sourceMappingURL=showtime.controller.js.map
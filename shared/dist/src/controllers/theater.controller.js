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
class TheaterController {
    createTheater(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theaterData = req.body;
                const theater = yield _services_1.theaterService.createTheater(theaterData);
                const response = new formatter_1.default(theater, links_1.theaterLinks.post);
                return res.status(201).json(response.format());
            }
            catch (error) {
                libs_1.default.error('CreateTheater', error);
                return next(error);
            }
        });
    }
    getTheater(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theater = yield _services_1.theaterService.getTheater((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                const response = new formatter_1.default(theater, links_1.theaterLinks.get);
                return res.status(200).json(response.format());
            }
            catch (error) {
                libs_1.default.error('GetTheater', error);
                return next(error);
            }
        });
    }
    getTheaters(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { theaters, metadata } = yield _services_1.theaterService.getTheaters(req.query);
                const theatersData = theaters.map(theater => new formatter_1.default(theater).format());
                return res.status(200).json({ metadata, data: theatersData });
            }
            catch (error) {
                libs_1.default.error('GetTheaters', error);
                return next(error);
            }
        });
    }
}
exports.default = TheaterController;
//# sourceMappingURL=theater.controller.js.map
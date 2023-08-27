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
const links_1 = require("@utils/links");
const _services_1 = require("@services");
class MovieController {
    createMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieData = req.body;
                const movie = yield _services_1.movieService.createMovie(movieData);
                const response = new formatter_1.default(movie, links_1.movieLinks.post);
                return res.status(201).json(response.format());
            }
            catch (error) {
                libs_1.default.error(`Create Movie Error: ${error}`);
                return next(error);
            }
        });
    }
    getMovies(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { movies, metadata } = yield _services_1.movieService.getMovies(req.query);
                const moviesData = movies.map(movie => new formatter_1.default(movie).format());
                return res.status(200).json({ metadata, data: moviesData });
            }
            catch (error) {
                libs_1.default.error(`Get Movies Error: ${error}`);
                return next(error);
            }
        });
    }
    getMovie(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movie = yield _services_1.movieService.getMovie((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
                const response = new formatter_1.default(movie, links_1.movieLinks.get);
                return res.status(200).json(response.format());
            }
            catch (error) {
                libs_1.default.error(`Get Movie Error: ${error}`);
                return next(error);
            }
        });
    }
}
exports.default = MovieController;
//# sourceMappingURL=movie.controller.js.map
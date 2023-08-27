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
const movieDataValidator_1 = require("@validators/movieDataValidator");
const _respositories_1 = require("@respositories");
class MovieService {
    createMovie(movieData) {
        return __awaiter(this, void 0, void 0, function* () {
            new movieDataValidator_1.MovieDataValidator(movieData).validate();
            const movieExist = yield _respositories_1.movieRepository.findOne({ where: { title: movieData.title } });
            if (movieExist)
                throw new libs_1.ConflictException('Movie with this title already exist');
            const newMovie = yield _respositories_1.movieRepository.create(movieData);
            return newMovie;
        });
    }
    getMovies(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _respositories_1.movieRepository.findAll(reqQuery);
        });
    }
    getMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const movie = yield _respositories_1.movieRepository.findMovieWithAssociates(movieId);
            if (!movie)
                throw new libs_1.NotFoundException('Movie not found');
            return movie;
        });
    }
}
exports.default = MovieService;
//# sourceMappingURL=movie.service.js.map
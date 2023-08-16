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
const api_features_1 = __importDefault(require("@utils/api.features"));
const movies_1 = __importDefault(require("@models/movies"));
class MovieRepository {
    createMovie(movieData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movies_1.default.create(movieData);
        });
    }
    getMovieById(movieId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movies_1.default.findByPk(movieId, options);
        });
    }
    getMovie(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movies_1.default.findOne(options);
        });
    }
    getMovies(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new api_features_1.default(reqQuery);
            const [offset, limit] = query.paginate();
            const rows = yield movies_1.default.findAll({
                where: query.filter(),
                attributes: query.getFieldsQuery(),
                order: query.sort(),
                offset: offset,
                limit: limit,
            });
            const metadata = query.getMetadata({ total: rows.length, itemPerPage: rows.length });
            return { movies: rows, metadata };
        });
    }
    updateMovie(movieId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield movies_1.default.update(Object.assign({}, options), { where: { movieId } });
            return yield this.getMovieById(movieId);
        });
    }
    deleteMovie(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield movies_1.default.destroy({ where: { movieId: movieId } });
        });
    }
}
exports.default = MovieRepository;
//# sourceMappingURL=movie.repository.js.map
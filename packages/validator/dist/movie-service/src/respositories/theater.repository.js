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
const theater_1 = __importDefault(require("@models/theater"));
const api_features_1 = __importDefault(require("@utils/api.features"));
class TheaterRepository {
    createTheather(theaterData) {
        return __awaiter(this, void 0, void 0, function* () {
            return theater_1.default.create(theaterData);
        });
    }
    getTheaterById(theaterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield theater_1.default.findByPk(theaterId);
        });
    }
    getTheater(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield theater_1.default.findOne(options);
        });
    }
    getTheaters(reqQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = new api_features_1.default(reqQuery);
            const [offset, limit] = query.paginate();
            const { count, rows } = yield theater_1.default.findAndCountAll({
                where: query.filter(),
                attributes: query.getFieldsQuery(),
                order: query.sort(),
                offset: offset,
                limit: limit,
            });
            const metadata = query.getMetadata({ total: count, itemPerPage: rows.length });
            return { theaters: rows, metadata };
        });
    }
    updateTheater(theaterId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield theater_1.default.update(Object.assign({}, options), { where: { theaterId } });
            return this.getTheaterById(theaterId);
        });
    }
    deleteTheater(theaterId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options)
                return yield theater_1.default.destroy({ where: Object.assign({}, options) });
            return yield theater_1.default.destroy({ where: { theaterId } });
        });
    }
}
exports.default = TheaterRepository;
//# sourceMappingURL=theater.repository.js.map
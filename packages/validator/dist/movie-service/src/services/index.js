"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theaterService = exports.movieService = void 0;
const movie_service_1 = __importDefault(require("./movie.service"));
const theater_service_1 = __importDefault(require("./theater.service"));
exports.movieService = new movie_service_1.default();
exports.theaterService = new theater_service_1.default();
//# sourceMappingURL=index.js.map
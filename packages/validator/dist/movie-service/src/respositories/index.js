"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theaterRepository = exports.movieRepository = void 0;
const movie_repository_1 = __importDefault(require("./movie.repository"));
const theater_repository_1 = __importDefault(require("./theater.repository"));
exports.movieRepository = new movie_repository_1.default();
exports.theaterRepository = new theater_repository_1.default();
//# sourceMappingURL=index.js.map
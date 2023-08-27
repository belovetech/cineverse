"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatRepository = exports.showtimeRepository = exports.theaterRepository = exports.movieRepository = void 0;
const movie_repository_1 = __importDefault(require("./movie.repository"));
const theater_repository_1 = __importDefault(require("./theater.repository"));
const showtime_repository_1 = __importDefault(require("./showtime.repository"));
const seat_repository_1 = __importDefault(require("./seat.repository"));
exports.movieRepository = new movie_repository_1.default();
exports.theaterRepository = new theater_repository_1.default();
exports.showtimeRepository = new showtime_repository_1.default();
exports.seatRepository = new seat_repository_1.default();
//# sourceMappingURL=index.js.map
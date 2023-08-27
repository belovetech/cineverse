"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seatService = exports.showtimeService = exports.theaterService = exports.movieService = void 0;
const movie_service_1 = __importDefault(require("./movie.service"));
const theater_service_1 = __importDefault(require("./theater.service"));
const showtime_service_1 = __importDefault(require("./showtime.service"));
const seat_service_1 = __importDefault(require("./seat.service"));
exports.movieService = new movie_service_1.default();
exports.theaterService = new theater_service_1.default();
exports.showtimeService = new showtime_service_1.default();
exports.seatService = new seat_service_1.default();
//# sourceMappingURL=index.js.map
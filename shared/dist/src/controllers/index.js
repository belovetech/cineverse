"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownendpoint = exports.theaterController = exports.seatController = exports.showtimeController = exports.movieController = exports.healthcheckController = void 0;
const healthcheck_controller_1 = __importDefault(require("./healthcheck.controller"));
const movie_controller_1 = __importDefault(require("./movie.controller"));
const showtime_controller_1 = __importDefault(require("./showtime.controller"));
const seat_controller_1 = __importDefault(require("./seat.controller"));
const theater_controller_1 = __importDefault(require("./theater.controller"));
const unknownendpoint_1 = __importDefault(require("./unknownendpoint"));
exports.healthcheckController = new healthcheck_controller_1.default();
exports.movieController = new movie_controller_1.default();
exports.showtimeController = new showtime_controller_1.default();
exports.seatController = new seat_controller_1.default();
exports.theaterController = new theater_controller_1.default();
exports.unknownendpoint = new unknownendpoint_1.default();
//# sourceMappingURL=index.js.map
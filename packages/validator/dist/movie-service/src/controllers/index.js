"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownendpoint = exports.healthcheckController = exports.movieController = exports.theaterController = void 0;
const theater_controller_1 = __importDefault(require("./theater.controller"));
const movie_controller_1 = __importDefault(require("./movie.controller"));
const healthcheck_controller_1 = __importDefault(require("./healthcheck.controller"));
const unknownendpoint_1 = __importDefault(require("./unknownendpoint"));
exports.theaterController = new theater_controller_1.default();
exports.movieController = new movie_controller_1.default();
exports.healthcheckController = new healthcheck_controller_1.default();
exports.unknownendpoint = new unknownendpoint_1.default();
//# sourceMappingURL=index.js.map
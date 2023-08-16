"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoute = exports.theaterRoute = exports.healthcheckRoute = void 0;
const healthcheck_route_1 = __importDefault(require("./healthcheck.route"));
const movie_route_1 = __importDefault(require("./movie.route"));
const theater_route_1 = __importDefault(require("./theater.route"));
exports.healthcheckRoute = new healthcheck_route_1.default();
exports.theaterRoute = new theater_route_1.default();
exports.movieRoute = new movie_route_1.default();
//# sourceMappingURL=index.js.map
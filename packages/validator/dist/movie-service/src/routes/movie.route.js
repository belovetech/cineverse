"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const express_1 = require("express");
class MovieRoute {
    constructor() {
        this.path = '/movies';
        this.router = (0, express_1.Router)();
        this.movieController = _controllers_1.movieController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, this.movieController.createMovie);
        this.router.get(this.path, this.movieController.getMovies);
        this.router.get(`${this.path}/:id`, this.movieController.getMovie);
    }
}
exports.default = MovieRoute;
//# sourceMappingURL=movie.route.js.map
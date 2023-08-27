"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const express_1 = require("express");
class TheaterRoute {
    constructor() {
        this.path = '/theaters';
        this.router = (0, express_1.Router)();
        this.theaterController = _controllers_1.theaterController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, this.theaterController.createTheater);
        this.router.get(this.path, this.theaterController.getTheaters);
        this.router.get(`${this.path}/:id`, this.theaterController.getTheater);
    }
}
exports.default = TheaterRoute;
//# sourceMappingURL=theater.route.js.map
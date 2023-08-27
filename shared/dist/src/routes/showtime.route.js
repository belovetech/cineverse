"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const express_1 = require("express");
class ShowtimeRoute {
    constructor() {
        this.path = '/showtimes';
        this.router = (0, express_1.Router)();
        this.showtimeController = _controllers_1.showtimeController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, this.showtimeController.createshowtime);
        this.router.get(this.path, this.showtimeController.getShowtimes);
        this.router.get(`${this.path}/:id`, this.showtimeController.getshowtime);
    }
}
exports.default = ShowtimeRoute;
//# sourceMappingURL=showtime.route.js.map
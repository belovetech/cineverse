"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("@controllers");
const express_1 = require("express");
class SeatRoute {
    constructor() {
        this.path = '/seats';
        this.router = (0, express_1.Router)();
        this.seatController = _controllers_1.seatController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, this.seatController.createSeat);
        this.router.get(this.path, this.seatController.getSeats);
        this.router.get(`${this.path}/:id`, this.seatController.getSeat);
    }
}
exports.default = SeatRoute;
//# sourceMappingURL=seat.route.js.map
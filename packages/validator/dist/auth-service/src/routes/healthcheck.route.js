"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthcheck_controller_1 = __importDefault(require("@controllers/healthcheck.controller"));
class HealthCheckRoute {
    constructor() {
        this.path = "/ping";
        this.router = (0, express_1.Router)();
        this.healthcheck = new healthcheck_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.healthcheck.ping);
    }
}
exports.default = HealthCheckRoute;
//# sourceMappingURL=healthcheck.route.js.map
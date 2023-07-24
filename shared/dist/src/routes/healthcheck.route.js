"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthcheck_1 = __importDefault(require("@controllers/healthcheck"));
class HealthCheckRoute {
    constructor() {
        this.path = '/ping';
        this.router = (0, express_1.Router)();
        this.healthController = new healthcheck_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.healthController.ping);
    }
}
exports.default = HealthCheckRoute;
//# sourceMappingURL=healthcheck.route.js.map
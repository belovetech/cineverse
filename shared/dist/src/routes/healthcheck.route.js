"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _controllers_1 = require("@controllers");
class HealthCheckRoute {
    constructor() {
        this.path = '/ping';
        this.router = (0, express_1.Router)();
        this.healthController = _controllers_1.healthcheckController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.healthController.ping);
    }
}
exports.default = HealthCheckRoute;
//# sourceMappingURL=healthcheck.route.js.map
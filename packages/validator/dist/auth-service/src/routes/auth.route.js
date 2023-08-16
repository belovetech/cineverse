"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("@controllers/auth.controller");
const auth_middleware_1 = require("@middlewares/auth.middleware");
const loginThrottle_middleware_1 = require("@middlewares/loginThrottle.middleware");
class AuthRoute {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.AuthController();
        this.initializeRouter();
    }
    initializeRouter() {
        this.router.post(`${this.path}/signup`, this.authController.signup);
        this.router.post(`${this.path}/login`, loginThrottle_middleware_1.loginThrottleMiddleware, this.authController.login);
        this.router.post(`${this.path}/logout`, auth_middleware_1.authMiddleware, this.authController.logout);
        this.router.post(`${this.path}/verify`, this.authController.verifyOtp);
        this.router.post(`${this.path}/otp`, this.authController.sendOtp);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map
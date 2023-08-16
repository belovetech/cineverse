"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginThrottleMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const maxAttempts = 5;
const windowMinutes = 15;
exports.loginThrottleMiddleware = (0, express_rate_limit_1.default)({
    windowMs: windowMinutes * 60 * 1000,
    max: maxAttempts,
    message: {
        error: "Too many login attempts from this IP address, please try again later!",
    },
});
//# sourceMappingURL=loginThrottle.middleware.js.map
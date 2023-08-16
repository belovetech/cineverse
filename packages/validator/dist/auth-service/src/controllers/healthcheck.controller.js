"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("@datasource/database"));
const redis_1 = __importDefault(require("@datasource/redis"));
class HealthCheck {
    ping(req, res, next) {
        try {
            if (database_1.default.isAlive() && redis_1.default.isAlive()) {
                return res.status(200).json({ message: "Pong!" });
            }
            return res.status(500).json({
                message: "Connection is down!",
                mongoClient: database_1.default.isAlive(),
                redisClient: redis_1.default.isAlive(),
            });
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = HealthCheck;
//# sourceMappingURL=healthcheck.controller.js.map
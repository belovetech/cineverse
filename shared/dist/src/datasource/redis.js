"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const _config_1 = __importDefault(require("@config"));
const logger_1 = require("@cineverse/logger");
class RedisClient {
    constructor(option) {
        this.redis = new ioredis_1.default(option);
    }
    set(key, value, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redis.set(key, value);
            this.redis.expire(key, duration);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.redis.get(key);
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redis.del(key);
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.redis.connect();
                logger_1.logger.info("Connect to redis server succesfully");
            }
            catch (error) {
                logger_1.logger.error("Unable to connect to the redis server: ${error}");
                process.exit(1);
            }
        });
    }
    disconnect() {
        this.redis.disconnect();
        logger_1.logger.info("Redis server succesfully disconncted");
    }
    isAlive() {
        if (this.redis) {
            return true;
        }
        return false;
    }
}
const redisOptions = {
    host: _config_1.default.redis.host,
    port: _config_1.default.redis.port,
};
exports.default = new RedisClient(redisOptions);
//# sourceMappingURL=redis.js.map
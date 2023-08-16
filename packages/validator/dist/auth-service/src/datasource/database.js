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
const mongoose_1 = __importDefault(require("mongoose"));
const _config_1 = __importDefault(require("@config"));
const logger_1 = require("@cineverse/logger");
class MongoClient {
    constructor(url, options) {
        mongoose_1.default.connect(url, options);
        this.connection = mongoose_1.default.connection;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection.on("error", () => {
                logger_1.logger.error("Unable to connect to the database");
                process.exit(1);
            });
            this.connection.once("open", () => {
                logger_1.logger.info("Database connection has been established successfully");
            });
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.close();
            logger_1.logger.info("Database connection has been disconnected.");
        });
    }
    isAlive() {
        if (this.connection) {
            return true;
        }
        return false;
    }
}
function getUrl(env) {
    if (env === "test") {
        return _config_1.default.test.uri;
    }
    return _config_1.default.development.uri;
}
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
exports.default = new MongoClient(getUrl(_config_1.default.node_env), options);
//# sourceMappingURL=database.js.map
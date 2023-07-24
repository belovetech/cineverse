"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _config_1 = __importDefault(require("@config"));
const logger_1 = require("@cineverse/logger");
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = _config_1.default.development.port || 5000;
        this.initializeRoutes(routes);
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info('==================================');
            logger_1.logger.info(`App listening on localhost:${this.port} 🚀`);
            logger_1.logger.info('==================================');
        });
    }
    initializeRoutes(routes) {
        routes.forEach(route => this.app.use('/v1', route.router));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
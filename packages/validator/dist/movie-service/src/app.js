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
const express_1 = __importDefault(require("express"));
const _config_1 = __importDefault(require("@config"));
const error_middleware_1 = __importDefault(require("@middlewares/error.middleware"));
const _datasource_1 = __importDefault(require("@datasource"));
const logger_1 = require("@cineverse/logger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = __importDefault(require("@utils/swagger"));
const unknownendpoint_1 = __importDefault(require("@controllers/unknownendpoint"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = _config_1.default.port || 5000;
        this.initializeDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwaggerUi();
        this.handleUnknownEndpoint();
        this.initializeGlobalErrorHandler();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info('==================================');
            logger_1.logger.info(`App listening on localhost:${this.port} 🚀`);
            logger_1.logger.info('==================================');
        });
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield _datasource_1.default.connect();
        });
    }
    initializeRoutes(routes) {
        routes.forEach(route => this.app.use('/v1', route.router));
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeSwaggerUi() {
        const specs = (0, swagger_jsdoc_1.default)(swagger_1.default);
        this.app.use('/v1/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    handleUnknownEndpoint() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.all('*', unknownendpoint_1.default.handler);
        });
    }
    initializeGlobalErrorHandler() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
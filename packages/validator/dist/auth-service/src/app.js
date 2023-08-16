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
const logger_1 = require("@cineverse/logger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const _config_1 = __importDefault(require("@config"));
const morgan_middleware_1 = __importDefault(require("@middlewares/morgan.middleware"));
const error_middleware_1 = __importDefault(require("@middlewares/error.middleware"));
const database_1 = __importDefault(require("@datasource/database"));
const unknownRoute_controller_1 = __importDefault(require("@controllers/unknownRoute.controller"));
const swaggerOptions_1 = __importDefault(require("@utils/swaggerOptions"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = _config_1.default.development.port || 3000;
        this.env = _config_1.default.node_env;
        void this.inititializeDatabase();
        this.inititializeMiddlewares();
        this.inititializeRoutes(routes);
        this.initializeSwaggerUi();
        this.handleUnknownRoute();
        this.initializeGlobalErrorHandler();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info("==================================");
            logger_1.logger.info(`App listening on localhost:${this.port} 🚀`);
            logger_1.logger.info("==================================");
        });
    }
    getServer() {
        return this.app;
    }
    inititializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.connect();
        });
    }
    inititializeMiddlewares() {
        if (this.env === "development") {
            this.app.use((0, morgan_middleware_1.default)());
        }
        this.app.use((0, morgan_1.default)("combined"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    inititializeRoutes(routes) {
        routes.forEach(route => this.app.use("/v1", route.router));
    }
    handleUnknownRoute() {
        this.app.all("*", unknownRoute_controller_1.default.handler);
    }
    initializeGlobalErrorHandler() {
        this.app.use(error_middleware_1.default);
    }
    initializeSwaggerUi() {
        const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.default);
        this.app.use("/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _app_1 = __importDefault(require("@app"));
const auth_route_1 = __importDefault(require("@routes/auth.route"));
const customers_route_1 = __importDefault(require("@routes/customers.route"));
const healthcheck_route_1 = __importDefault(require("@routes/healthcheck.route"));
const routes = [new healthcheck_route_1.default(), new customers_route_1.default(), new auth_route_1.default()];
const app = new _app_1.default(routes);
app.listen();
//# sourceMappingURL=server.js.map
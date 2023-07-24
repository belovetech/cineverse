"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _app_1 = __importDefault(require("@app"));
const healthcheck_route_1 = __importDefault(require("@routes/healthcheck.route"));
const app = new _app_1.default([new healthcheck_route_1.default()]);
app.listen();
//# sourceMappingURL=server.js.map
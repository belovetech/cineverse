"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _app_1 = __importDefault(require("@app"));
const _routes_1 = require("@routes");
const app = new _app_1.default([_routes_1.healthcheckRoute, _routes_1.movieRoute, _routes_1.theaterRoute]);
app.listen();
//# sourceMappingURL=server.js.map
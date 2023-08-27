"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const _config_1 = __importDefault(require("@config"));
let database;
if (_config_1.default.node_env === 'test') {
    database = new database_1.PostgresClient(Object.assign({}, _config_1.default.test));
}
else {
    database = new database_1.PostgresClient(Object.assign({}, _config_1.default.development));
}
exports.default = database;
//# sourceMappingURL=index.js.map
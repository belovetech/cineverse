"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '/../../.env' });
const config = {
    development: {
        database: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
    },
    test: {
        database: process.env.TEST_DB_NAME,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    },
    node_env: process.env.NODE_ENV || 'development',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3000,
    dialect: process.env.DB_DIALECT,
    baseUrl: process.env.BASE_URL,
    apiUrl: process.env.API_URL,
};
exports.default = config;
//# sourceMappingURL=index.js.map
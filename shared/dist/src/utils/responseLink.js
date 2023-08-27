"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_links = exports.GET_links = exports.POST_links = void 0;
const _config_1 = __importDefault(require("@config"));
const baseUrl = _config_1.default.baseUrl;
exports.POST_links = [
    {
        rel: "self",
        href: `${baseUrl}/customer`,
        action: "POST",
        types: ["text/xml", "application/json"],
    },
    {
        rel: "customer",
        href: `${baseUrl}/customer`,
        action: "UPDATE",
        types: ["text/xml", "application/json"],
    },
];
exports.GET_links = [
    {
        rel: "self",
        href: `${baseUrl}/customer`,
        action: "GET",
        types: ["text/xml", "application/json"],
    },
    {
        rel: "customer",
        href: `${baseUrl}/customer`,
        action: "UPDATE",
        types: ["text/xml", "application/json"],
    },
];
exports.UPDATE_links = [
    {
        rel: "self",
        href: `${baseUrl}/customer`,
        action: "UPDATE",
        types: ["text/xml", "application/json"],
    },
    {
        rel: "customer",
        href: `${baseUrl}/customer`,
        action: "GET",
        types: ["text/xml", "application/json"],
    },
];
//# sourceMappingURL=responseLink.js.map
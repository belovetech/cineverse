"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theaterLinks = exports.movieLinks = void 0;
const _config_1 = __importDefault(require("@config"));
const baseUrl = _config_1.default.baseUrl;
exports.movieLinks = {
    post: [
        {
            rel: 'self',
            href: `${baseUrl}/movies`,
            action: 'POST',
            types: ['text/xml', 'application/json'],
        },
        {
            rel: 'movie',
            href: `${baseUrl}/movies`,
            action: 'UPDATE',
            types: ['text/xml', 'application/json'],
        },
    ],
    get: [
        {
            rel: 'self',
            href: `${baseUrl}/movies`,
            action: 'GET',
            types: ['text/xml', 'application/json'],
        },
        {
            rel: 'movie',
            href: `${baseUrl}/movies`,
            action: 'UPDATE',
            types: ['text/xml', 'application/json'],
        },
    ],
    update: [
        {
            rel: 'self',
            href: `${baseUrl}/movies`,
            action: 'UPDATE',
            types: ['text/xml', 'application/json'],
        },
        {
            rel: 'movie',
            href: `${baseUrl}/movies`,
            action: 'GET',
            types: ['text/xml', 'application/json'],
        },
    ],
};
exports.theaterLinks = {
    post: [
        {
            rel: 'self',
            href: `${baseUrl}/theaters`,
            action: 'POST',
            types: ['text/xml', 'application/json'],
        },
        {
            rel: 'theater',
            href: `${baseUrl}/theaters`,
            action: 'UPDATE',
            types: ['text/xml', 'application/json'],
        },
    ],
    get: [
        {
            rel: 'self',
            href: `${baseUrl}/theaters`,
            action: 'GET',
            types: ['text/xml', 'application/json'],
        },
        {
            rel: 'theater',
            href: `${baseUrl}/theaters`,
            action: 'UPDATE',
            types: ['text/xml', 'application/json'],
        },
    ],
    update: [
        {
            rel: 'self',
            href: `${baseUrl}/theaters`,
            action: 'UPDATE',
            types: ['text/xml', 'application/json'],
        },
        {
            rel: 'theater',
            href: `${baseUrl}/theaters`,
            action: 'GET',
            types: ['text/xml', 'application/json'],
        },
    ],
};
//# sourceMappingURL=links.js.map
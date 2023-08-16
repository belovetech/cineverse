"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Movie service',
            description: 'cineverse movie service documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000/v1',
            },
        ],
        schemes: ['http'],
    },
    apis: ['swagger.yaml'],
};
exports.default = options;
//# sourceMappingURL=swagger.js.map
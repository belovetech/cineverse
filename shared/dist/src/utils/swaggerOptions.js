"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Authentication service",
            description: "Movie ticketing system auth service",
        },
        servers: [
            {
                url: "http://localhost:8000/v1",
            },
        ],
        schemes: ["http"],
    },
    apis: ["swagger.yaml"],
};
exports.default = options;
//# sourceMappingURL=swaggerOptions.js.map
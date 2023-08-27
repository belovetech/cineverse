declare const options: {
    swaggerDefinition: {
        openapi: string;
        info: {
            version: string;
            title: string;
            description: string;
        };
        servers: {
            url: string;
        }[];
        schemes: string[];
    };
    apis: string[];
};
export default options;

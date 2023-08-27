declare const config: {
    development: {
        database: any;
        username: any;
        password: any;
    };
    test: {
        database: any;
        username: any;
        password: any;
    };
    redis: {
        host: any;
        port: number;
    };
    node_env: any;
    host: any;
    port: any;
    dialect: any;
    baseUrl: any;
    apiUrl: any;
};
export default config;

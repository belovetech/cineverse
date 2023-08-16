declare const config: {
    development: {
        database: string;
        username: string;
        password: string;
    };
    test: {
        database: string;
        username: string;
        password: string;
    };
    redis: {
        host: string;
        port: number;
    };
    node_env: string;
    host: string;
    port: string | number;
    dialect: string;
    baseUrl: string;
    apiUrl: string;
};
export default config;

declare const config: {
    node_env: string;
    development: {
        uri: string;
        port: string | number;
    };
    test: {
        uri: string;
        port: string | number;
    };
    redis: {
        host: string;
        port: number;
    };
    baseUrl: string;
    api_Url: string;
    secret: string;
};
export default config;

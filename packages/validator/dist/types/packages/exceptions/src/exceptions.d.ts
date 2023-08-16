export declare class Exception extends Error {
    statusCode: number;
    message: string;
    name: string;
    constructor(statusCode: number, message: string);
}

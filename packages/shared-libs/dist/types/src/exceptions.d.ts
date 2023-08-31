export declare class Exception extends Error {
    message: string;
    name: string;
    statusCode: number;
    constructor(message?: string);
}
export declare class AuthenticationException extends Exception {
    constructor(message?: string);
}
export declare class BadRequestException extends Exception {
    constructor(message?: string | object);
}
export declare class ConflictException extends Exception {
    constructor(message?: string);
}
export declare class ForbiddenException extends Exception {
    constructor(message?: string);
}
export declare class NotFoundException extends Exception {
    constructor(message?: string);
}

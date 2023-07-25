import { Exception } from './exceptions';
export declare class AuthenticationException extends Exception {
    constructor(message?: string, statusCode?: number);
}

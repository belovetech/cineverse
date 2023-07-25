import { Exception } from './exceptions';
export declare class ValidationException extends Exception {
    constructor(message?: string, statusCode?: number);
}

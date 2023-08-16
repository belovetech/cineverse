import { Exception } from './exceptions';
export declare class BadRequestException extends Exception {
    constructor(message?: string, statusCode?: number);
}

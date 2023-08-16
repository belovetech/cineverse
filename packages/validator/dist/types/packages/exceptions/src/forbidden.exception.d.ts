import { Exception } from './exceptions';
export declare class ForbiddenException extends Exception {
    constructor(message?: string, statusCode?: number);
}

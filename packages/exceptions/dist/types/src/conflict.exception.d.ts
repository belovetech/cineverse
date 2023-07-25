import { Exception } from './exceptions';
export declare class ConflictException extends Exception {
    constructor(message?: string, statusCode?: number);
}

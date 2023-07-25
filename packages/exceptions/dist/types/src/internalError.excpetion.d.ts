import { Exception } from './exceptions';
export declare class InternalServerException extends Exception {
    constructor(message?: string, statusCode?: number);
}

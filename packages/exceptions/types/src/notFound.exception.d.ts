import { Exception } from './exceptions';
export declare class NotFoundException extends Exception {
    constructor(message?: string, statusCode?: number);
}

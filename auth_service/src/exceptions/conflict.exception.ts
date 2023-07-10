import { Exception } from './exceptions';

export class ConflictException extends Exception {
  constructor(message?: string, statusCode?: number) {
    super(statusCode, message);
    this.statusCode = 409;
    this.message = message ?? 'Conflict:: Customer already exists.';
  }
}

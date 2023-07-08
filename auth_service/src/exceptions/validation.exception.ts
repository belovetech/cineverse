import { Exception } from './exceptions';

export class ValidationException extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

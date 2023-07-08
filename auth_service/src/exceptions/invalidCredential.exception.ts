import { Exception } from './exceptions';

export class InvalidCredentialsException extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

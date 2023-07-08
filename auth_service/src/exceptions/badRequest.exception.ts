import { Exception } from './exceptions';

export class BadRequestException extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

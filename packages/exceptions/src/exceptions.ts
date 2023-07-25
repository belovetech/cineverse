export class Exception extends Error {
  public statusCode: number;
  public message: string;
  public name: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = this.constructor.name;
    // Error.captureStackTrace(this, this.constructor);
  }
}

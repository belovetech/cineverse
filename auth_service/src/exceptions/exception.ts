export class Exception extends Error {
  public statusCode: number;
  public message: string;
  public type: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.type = 'ValidationError';
  }
}

export class NotFoundError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.type = 'NotFoundError';
  }
}

export class InvalidCredentialsError extends Exception {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
    this.type = 'InvalidCredentialsError';
  }
}

export class AuthenticationError extends Exception {
  constructor(statusCode: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 401;
    this.type = 'AuthenticationError';
    this.message = 'Unauthorized:: Authentication failed';
  }
}

export class ForbiddenError extends Exception {
  constructor(statusCode?: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 403;
    this.type = 'AuthorizationError';
    this.message = 'Forbidden:: Unauthorized';
  }
}

export class InternalServerError extends Exception {
  constructor(statusCode?: number, message?: string) {
    super(statusCode, message);
    this.statusCode = 500;
    this.type = 'InternalServerError';
    this.message = 'Internal Server Error';
  }
}

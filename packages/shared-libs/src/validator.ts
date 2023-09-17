import { BadRequestException } from './exceptions';

export default abstract class Validator<T> {
  readonly payload: T;
  readonly keys: (keyof T)[];
  public errors: object;
  public errorCounter: number = 0;

  constructor(payload: T) {
    this.payload = payload;
    this.errors = {};
    this.keys = Object.keys(payload as Record<string, unknown>) as Array<
      keyof typeof this.payload
    >;
  }

  protected isValidKey(key: keyof T): boolean {
    return this.keys.includes(key);
  }

  protected printErrors(): void {
    const message = {
      message: `You have (${this.errorCounter}) errors to fix`,
      errors: { ...this.errors },
    };
    throw new BadRequestException(message);
  }

  protected validateString(key: string, value: string): void {
    if (!value || typeof value !== 'string' || value.trim().length < 3) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected validateNumber(key: string, value: number): void {
    if (!value || typeof value !== 'number' || isNaN(value)) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected validateEmail(key: string, value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== 'string' || !emailRegex.test(value)) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected validatePassword(key: keyof T, value: string): void {
    const passwordRegex =
      /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=]).{7,}$/;
    if (!value || !passwordRegex.test(value)) {
      this.addError({ [key]: 'Please provide a strong password' });
    }
  }

  protected validateUUIDv4(key: string, uuid: string): void {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!uuidRegex.test(uuid)) {
      this.addError({ [key]: `Please provide a valid ${[key]}` });
    }
  }

  protected addError(error: Record<string, string>): void {
    this.errors = { ...this.errors, ...error };
    this.errorCounter = Object.keys(this.errors).length;
  }

  abstract validate(data: T): void;
}

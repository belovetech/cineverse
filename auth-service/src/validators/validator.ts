import { ValidationException } from "@cineverse/exceptions";

export default abstract class Validator<T> {
  protected payload: T;
  protected validates: Array<Record<string, unknown>>;
  protected errorCounter = 0;

  constructor(payload: T) {
    this.payload = payload;
    this.validates = [];
  }

  protected isValidKey(key: keyof T): boolean {
    return Object.keys(this.payload).includes(key as string);
  }

  protected printErrors(): void {
    const message = { message: `You have (${this.errorCounter}) errors to fix`, errors: this.validates };
    throw new ValidationException(JSON.stringify(message));
  }

  protected validateString(key: keyof T, value: string): void {
    if (!value || typeof value !== "string" || value.trim().length < 3) {
      this.validates.push({ [key]: "Please provide a valid string" });
      this.errorCounter += 1;
    }
  }

  protected validateNumber(key: keyof T, value: number): void {
    if (!value || typeof value !== "number" || isNaN(value)) {
      this.validates.push({ [key]: "Please provide a valid number [0-9]" });
      this.errorCounter += 1;
    }
  }

  protected validateEmail(key: keyof T, value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof value !== "string" || !emailRegex.test(value)) {
      this.validates.push({ [key]: "Please provide a valid email" });
      this.errorCounter += 1;
    }
  }

  protected validateUnknownType(key: keyof T): void {
    this.validates.push({ [key]: "Please provide a required data" });
    this.errorCounter += 1;
  }

  abstract validate(data: T): void;
}

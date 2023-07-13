import Validator from '@utils/validator';
import { IPayload } from '@interfaces/customers.interface';

export class CustomerDataValidator<T extends IPayload> extends Validator<T> {
  constructor(payload: T) {
    super(payload);
  }

  public validate(data: T): void {
    this.validateString('firstName', data.firstName);
    this.validateString('firstName', data.firstName);
    this.validateEmail('email', data.email);
    this.validatePassword('password', data.password);

    for (const key in data) {
      if (data.hasOwnProperty(key) && !this.isValidKey(key as keyof T)) {
        this.validateUnknownType(key as keyof T);
      }
    }

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }

  private validatePassword(key: keyof T, value: string): void {
    const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=]).{7,}$/;
    if (!value || !passwordRegex.test(value)) {
      this.validates.push({ [key]: `Please provide a strong password` });
      this.errorCounter += 1;
    }
    if (!this.payload.passwordConfirm || this.payload.passwordConfirm !== value) {
      this.validates.push({ passwordConfirm: `Password must be the same` });
      this.errorCounter += 1;
    }
  }
}

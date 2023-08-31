import Validator from "@cineverse/libs/src/validator";
import { SignDto, SignupDto } from "@dtos/auth.dto";

export class CustomerDataValidator<T extends SignupDto> extends Validator<T> {
  public validate(): void {
    this.validateString("firstName", this.payload.firstName);
    this.validateString("lastName", this.payload.lastName);
    this.validateEmail("email", this.payload.email);
    this.validatePasswordAndPasswordConfirm("password", this.payload.password);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }
  protected validatePasswordAndPasswordConfirm(key1: keyof T, value: string): void {
    const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=]).{7,}$/;

    if (!value || !passwordRegex.test(value)) {
      this.addError({ [key1]: "Please provide a strong password" });
    }

    if (!this.payload.passwordConfirm || this.payload.passwordConfirm !== value) {
      this.addError({ passwordConfirm: "Password must be the same" });
    }
  }
}

export class SignValidator<T extends SignDto> extends Validator<T> {
  public validate(): void {
    this.validateEmail("email", this.payload.email);
    this.validatePassword("password", this.payload.password);

    if (this.errorCounter > 0) {
      this.printErrors();
    }
  }
}

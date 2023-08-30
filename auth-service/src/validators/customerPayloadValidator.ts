// import Validator from "packages";
// import { CustomerDto } from "@dtos/customers.dto";

// export class CustomerDataValidator<T extends CustomerDto> extends Validator<T> {
//   constructor(payload: T) {
//     super(payload);
//   }

//   public validate(): void {
//     this.validateString("firstName", this.payload.firstName);
//     this.validateString("lastName", this.payload.lastName);
//     this.validateEmail("email", this.payload.email);
//     this.validatePassword("password", this.payload.password);

//     for (const key in this.payload) {
//       if (!this.isValidKey(key as keyof T)) {
//         this.validateUnknownType(key as keyof T);
//       }
//     }

//     if (this.errorCounter > 0) {
//       this.printErrors();
//     }
//   }

//   private validatePassword(key: keyof T, value: string): void {
//     const passwordRegex = /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.*[a-zA-Z0-9@#$%^&+=]).{7,}$/;
//     if (!value || !passwordRegex.test(value)) {
//       this.validates.push({ [key]: "Please provide a strong password" });
//       this.errorCounter += 1;
//     }
//     if (!this.payload.passwordConfirm || this.payload.passwordConfirm !== value) {
//       this.validates.push({ passwordConfirm: "Password must be the same" });
//       this.errorCounter += 1;
//     }
//   }
// }

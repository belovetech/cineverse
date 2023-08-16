import Validator from "@validators/validator";
import { CustomerDto } from "@dtos/customers.dto";
export declare class CustomerDataValidator<T extends CustomerDto> extends Validator<T> {
    constructor(payload: T);
    validate(): void;
    private validatePassword;
}

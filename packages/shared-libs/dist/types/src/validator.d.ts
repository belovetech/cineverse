export default abstract class Validator<T> {
    readonly payload: T;
    readonly keys: (keyof T)[];
    errors: object;
    errorCounter: number;
    constructor(payload: T);
    protected isValidKey(key: keyof T): boolean;
    protected printErrors(): void;
    protected validateString(key: string, value: string): void;
    protected validateNumber(key: string, value: number): void;
    protected validateEmail(key: string, value: string): void;
    protected validatePassword(key: keyof T, value: string): void;
    protected validateUUIDv4(key: string, uuid: string): void;
    protected addError(error: Record<string, string>): void;
    abstract validate(data: T): void;
}

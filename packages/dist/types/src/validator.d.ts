export default abstract class Validator<T extends object> {
    readonly payload: T;
    errors: object;
    errorCounter: number;
    constructor(payload: T);
    protected isValidKey(key: keyof T): boolean;
    protected printErrors(): void;
    protected validateString(key: keyof T, value: string): void;
    protected validateNumber(key: keyof T, value: number): void;
    protected validateEmail(key: keyof T, value: string): void;
    protected validateUUIDv4(key: keyof T, uuid: string): void;
    protected addError(error: Record<string, string>): void;
    abstract validate(data: T): void;
}

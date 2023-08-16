export default abstract class Validator<T> {
    protected payload: T;
    protected errors: object;
    protected errorCounter: number;
    constructor(payload: T);
    protected isValidKey(key: keyof T): boolean;
    protected printErrors(): void;
    protected validateString(key: keyof T, value: string): void;
    protected validateNumber(key: keyof T, value: number): void;
    protected validateEmail(key: keyof T, value: string): void;
    protected validateUnknownType(): void;
    protected addError(error: Record<string, string>): void;
    abstract validate(data: T): void;
}

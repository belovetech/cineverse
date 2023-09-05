import { Application } from 'express';
interface EndpointAttributes {
    methods: string[];
    path: string;
    middleware: string[];
}
export default class EndpointLogger {
    private app;
    private baseUrl;
    endpoints: any;
    constructor(app: Application);
    log(): void;
    private logger;
    concatMethods: (endpoints: EndpointAttributes[]) => string[][];
    longestMethodStringLengthAndItemLength(methods: string[][]): [number, number];
    getlongestPath(): number;
    calaculateLeftSpaces(methods: string[], methodStringLength: number): string;
    calaculateRightSpaces(path: string): string;
}
export {};

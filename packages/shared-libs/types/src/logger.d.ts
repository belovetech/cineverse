export default class Logger {
    private colors;
    private env;
    private isDevelopment;
    private logFormat;
    private getTransports;
    createLogger(): import("winston").Logger;
}

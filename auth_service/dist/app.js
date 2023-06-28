"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.env = process.env.NODE_ENV || 'development';
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on localhost:${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
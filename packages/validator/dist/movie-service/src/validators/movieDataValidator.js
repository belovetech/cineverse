"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieDataValidator = void 0;
const validator_1 = __importDefault(require("@validators/validator"));
class MovieDataValidator extends validator_1.default {
    validate() {
        this.validateString('title', this.payload.title);
        this.validateString('genre', this.payload.genre);
        this.validateString('description', this.payload.description);
        this.validateString('duration', this.payload.duration);
        this.validateUnknownType();
        if (this.errorCounter > 0) {
            this.printErrors();
        }
    }
}
exports.MovieDataValidator = MovieDataValidator;
//# sourceMappingURL=movieDataValidator.js.map
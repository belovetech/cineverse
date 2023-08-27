"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const sequelize_typescript_1 = require("sequelize-typescript");
const seat_1 = __importDefault(require("./seat"));
const showtime_1 = __importDefault(require("./showtime"));
let Theater = class Theater extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Default)(() => (0, uuid_1.v4)().replace(/-/g, '')),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Theater.prototype, "theaterId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Theater.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Theater.prototype, "location", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Theater.prototype, "seatingCapacity", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => showtime_1.default),
    __metadata("design:type", Array)
], Theater.prototype, "showTimes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => seat_1.default),
    __metadata("design:type", Array)
], Theater.prototype, "seats", void 0);
Theater = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })),
    (0, sequelize_typescript_1.Table)({ tableName: 'theaters' })
], Theater);
exports.default = Theater;
//# sourceMappingURL=theater.js.map
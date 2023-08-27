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
const movies_1 = __importDefault(require("./movies"));
const theater_1 = __importDefault(require("./theater"));
let ShowTime = class ShowTime extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Default)(() => (0, uuid_1.v4)().replace(/-/g, '')),
    (0, sequelize_typescript_1.Column)({ primaryKey: true, type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], ShowTime.prototype, "showTimeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ShowTime.prototype, "startTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ShowTime.prototype, "endTime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE }),
    __metadata("design:type", String)
], ShowTime.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => movies_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], ShowTime.prototype, "movieId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => movies_1.default),
    __metadata("design:type", movies_1.default)
], ShowTime.prototype, "movie", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => theater_1.default),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], ShowTime.prototype, "theaterId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => theater_1.default),
    __metadata("design:type", theater_1.default)
], ShowTime.prototype, "theater", void 0);
ShowTime = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    })),
    (0, sequelize_typescript_1.Table)({ tableName: 'showTimes' })
], ShowTime);
exports.default = ShowTime;
//# sourceMappingURL=showtime.js.map
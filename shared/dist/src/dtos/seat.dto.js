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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatDto = exports.Status = void 0;
const class_validator_1 = require("class-validator");
var Status;
(function (Status) {
    Status["AVAILABLE"] = "available";
    Status["BOOKED"] = "booked";
    Status["CANCELLED"] = "cancelled";
})(Status = exports.Status || (exports.Status = {}));
class SeatDto {
    constructor() {
        this.status = Status.AVAILABLE;
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SeatDto.prototype, "seatId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], SeatDto.prototype, "seatNumber", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", String)
], SeatDto.prototype, "rowNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(Status),
    __metadata("design:type", String)
], SeatDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SeatDto.prototype, "theaterId", void 0);
exports.SeatDto = SeatDto;
//# sourceMappingURL=seat.dto.js.map
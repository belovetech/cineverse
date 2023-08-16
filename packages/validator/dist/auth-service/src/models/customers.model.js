"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSchema = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.customerSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: () => (0, uuid_1.v4)().replace(/-/g, ""),
        alias: "customerId",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
        select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
    collection: "customers",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.customerSchema.set("toJSON", {
    virtuals: true,
    transform: function (_doc, ret) {
        delete ret._id;
    },
});
exports.customerSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        this.passwordConfirm = undefined;
        next();
    });
});
const Customer = (0, mongoose_1.model)("Customer", exports.customerSchema);
exports.default = Customer;
//# sourceMappingURL=customers.model.js.map
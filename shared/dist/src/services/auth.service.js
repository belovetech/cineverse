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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customers_model_1 = __importDefault(require("@models/customers.model"));
const redis_1 = __importDefault(require("@datasource/redis"));
const _config_1 = __importDefault(require("@config"));
const exceptions_1 = require("@cineverse/exceptions");
const customerPayloadValidator_1 = require("@validators/customerPayloadValidator");
class AuthService {
    static signup(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new customerPayloadValidator_1.CustomerDataValidator(payload);
            validator.validate();
            const customerExist = yield customers_model_1.default.findOne({ email: payload.email }).exec();
            if (customerExist)
                throw new exceptions_1.ConflictException();
            const customer = yield customers_model_1.default.create(Object.assign({}, payload));
            const otp = yield this.sendOtp(customer.email);
            console.log(otp);
            return customer;
        });
    }
    static signin(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload.email || !payload.password)
                throw new exceptions_1.BadRequestException();
            const customer = yield customers_model_1.default.findOne({ email: payload.email }).select("+password");
            if (!customer)
                throw new exceptions_1.NotFoundException();
            if (!customer.isVerified)
                throw new exceptions_1.AuthenticationException("Verify your account before signing in.");
            const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, customer.password);
            if (!isCorrectPassword)
                throw new exceptions_1.AuthenticationException("Please check your email and password");
            const token = yield this.generateToken(customer);
            const cookie = this.setCookies(token);
            const key = `x-token_${customer.customerId}`;
            yield redis_1.default.del(key);
            yield redis_1.default.set(key, token, 60 * 60);
            return { cookie, customer };
        });
    }
    static signout(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload)
                throw new exceptions_1.NotFoundException();
            const key = `x-token_${payload.customerId}`;
            yield redis_1.default.del(key);
            return payload;
        });
    }
    static verifyOtp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(payload === null || payload === void 0 ? void 0 : payload.otp) || !(payload === null || payload === void 0 ? void 0 : payload.email))
                throw new exceptions_1.BadRequestException("Invalid OTP credentials");
            const customer = yield customers_model_1.default.findOne({ email: payload.email }).exec();
            if (!customer)
                throw new exceptions_1.NotFoundException("Provided email was not found");
            if (customer.isVerified)
                throw new exceptions_1.ConflictException("You are already being verified");
            const storedOtp = yield redis_1.default.get(`x-otp_${payload.email}`);
            if (!storedOtp)
                throw new exceptions_1.AuthenticationException("OTP token has expired");
            const validOtp = yield bcrypt_1.default.compare(payload.otp, storedOtp);
            if (!validOtp)
                throw new exceptions_1.AuthenticationException("Invalid OTP token");
            yield redis_1.default.del(`x-otp_${payload.email}`);
            customer.isVerified = true;
            yield customer.save();
            return customer;
        });
    }
    static sendOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield customers_model_1.default.findOne({ email }).exec();
            if (!customer)
                throw new exceptions_1.NotFoundException();
            const otp = this.generateOTP();
            const hashedOtp = yield bcrypt_1.default.hash(JSON.stringify(otp), 2);
            const key = `x-otp_${email}`;
            yield redis_1.default.del(key);
            redis_1.default.set(key, hashedOtp, 60 * 10);
            return otp;
        });
    }
    static generateOTP() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static generateToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const payloadStoredInToken = { customerId: payload.customerId };
            const token = yield jsonwebtoken_1.default.sign(payloadStoredInToken, _config_1.default.secret, { expiresIn: "1h" });
            return token;
        });
    }
    static setCookies(token) {
        return `Authorization=${token}; Secure; HttpOnly; SameSite=strict; Max-Age=${60 * 60}`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map
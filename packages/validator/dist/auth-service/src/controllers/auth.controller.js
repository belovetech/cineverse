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
exports.AuthController = void 0;
const auth_service_1 = __importDefault(require("@services/auth.service"));
const apiResponseFormatter_1 = __importDefault(require("@utils/apiResponseFormatter"));
const responseLink_1 = require("@utils/responseLink");
class AuthController {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerData = req.body;
                const newCustomer = yield auth_service_1.default.signup(customerData);
                const apiResponseFormatter = new apiResponseFormatter_1.default(newCustomer, responseLink_1.POST_links);
                return res.status(201).json(apiResponseFormatter.format());
            }
            catch (error) {
                return next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { customer, cookie } = yield auth_service_1.default.signin(payload);
                const apiResponseFormatter = new apiResponseFormatter_1.default(customer);
                res.setHeader("Set-Cookie", [cookie]);
                return res.status(200).json(apiResponseFormatter.format());
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_service_1.default.signout(req === null || req === void 0 ? void 0 : req.customer);
                res.setHeader("Set-Cookie", ["Authorization=; Max-Age=0"]);
                res.setHeader("Authorization", "");
                return res.status(200).json({ message: "Logout Successfully" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    sendOtp(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = yield auth_service_1.default.sendOtp((_a = req.body) === null || _a === void 0 ? void 0 : _a.email);
                return res.status(200).json({ otp });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const customer = yield auth_service_1.default.verifyOtp(payload);
                const apiResponseFormatter = new apiResponseFormatter_1.default(customer);
                return res.status(200).json(apiResponseFormatter.format());
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
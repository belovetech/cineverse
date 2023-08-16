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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _config_1 = __importDefault(require("@config"));
const exceptions_1 = require("@cineverse/exceptions");
const customers_model_1 = __importDefault(require("@models/customers.model"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const authorization = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.authorization);
        if (authorization && authorization.split(" ")[0] === "Bearer") {
            const token = authorization.split(" ")[1];
            if (!token)
                throw new exceptions_1.AuthenticationException("Authentication token missing");
            const valid = yield jsonwebtoken_1.default.verify(token, _config_1.default.secret);
            if (!valid.customerId)
                throw new exceptions_1.AuthenticationException("JWT malformed or invalid");
            const customer = yield customers_model_1.default.findById(valid.customerId).exec();
            if (!customer)
                throw new exceptions_1.NotFoundException();
            req.customer = customer;
            next();
        }
        else {
            throw new exceptions_1.AuthenticationException("Invalid authentication token");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map
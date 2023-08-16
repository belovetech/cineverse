"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../src/config/index"));
const database_1 = __importDefault(require("../src/datasource/database"));
const customers_model_1 = __importDefault(require("../src/models/customers.model"));
chai_1.default.use(chai_http_1.default);
(0, mocha_1.describe)("Authentication Endpoint Testing", function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(5000);
            yield database_1.default.connect();
            yield customers_model_1.default.deleteMany({});
        });
    });
    after(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.disconnect();
        });
    });
    const data = {
        firstName: "keith",
        lastName: "Jane",
        email: "keithj@gmail.com",
        password: "p@ssw0rd",
        passwordConfirm: "p@ssw0rd",
    };
    const url = index_1.default.api_Url;
    let customerId, token;
    (0, mocha_1.describe)("[POST] Signup Endpoint", function () {
        (0, mocha_1.it)("Signup with invalid payloads", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const emptyData = {};
                const res = yield chai_1.default.request(url).post("/auth/signup").send(emptyData);
                const errorCount = res.body.errors.length;
                (0, chai_1.expect)(res.status).to.equal(400);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("name", "ValidationException");
                (0, chai_1.expect)(res.body).to.haveOwnProperty("errors").with.lengthOf(errorCount);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("message", `You have (${errorCount}) errors to fix`);
            });
        });
        (0, mocha_1.it)("Signup with a valid payloads", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).post("/auth/signup").send(data);
                (0, chai_1.expect)(res.status).to.equal(201);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("firstName", data.firstName);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("lastName", data.lastName);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("email", data.email);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("isVerified", false);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("links");
                (0, chai_1.expect)(res.body.links).to.be.an("array");
                (0, chai_1.expect)(res.body.links[0]).to.be.a("object");
                (0, chai_1.expect)(res.body.links[0]).to.be.a("object").to.haveOwnProperty("rel", "self");
                (0, chai_1.expect)(res.body.links[0]).to.be.a("object").to.haveOwnProperty("action", "POST");
                customerId = res.body.customerId;
            });
        });
        (0, mocha_1.it)("Customer already have an account", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).post("/auth/signup").send(data);
                (0, chai_1.expect)(res.status).to.equal(409);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("error");
                (0, chai_1.expect)(res.body).to.haveOwnProperty("name", "ConflictException");
            });
        });
    });
    (0, mocha_1.describe)("[POST] OTP Verification", function () {
        let otp;
        (0, mocha_1.it)("Should not create user if user has not been verified", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const loginData = { email: data.email, password: data.password };
                const message = "Verify your account before signing in.";
                const res = yield chai_1.default.request(url).post("/auth/login").send(loginData);
                (0, chai_1.expect)(res.status).to.equal(401);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("name", "AuthenticationException");
                (0, chai_1.expect)(res.body).to.haveOwnProperty("error", message);
            });
        });
        (0, mocha_1.it)("Send otp to the customer email ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = { email: data.email };
                const res = yield chai_1.default.request(url).post("/auth/otp").send(payload);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.have.property("otp");
                (0, chai_1.expect)(res.body.otp).to.be.a("number");
                otp = res.body.otp.toString();
                (0, chai_1.expect)(otp).to.have.lengthOf(6);
            });
        });
        (0, mocha_1.it)("Verify customer with otp ", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = { email: data.email, otp: otp };
                const res = yield chai_1.default.request(url).post("/auth/verify").send(payload);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.have.haveOwnProperty("isVerified", true);
            });
        });
    });
    (0, mocha_1.describe)("[POST] Login Endpoint", function () {
        (0, mocha_1.it)("Login with wrong credentials", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = { email: data.email, password: "wrongPassword" };
                const message = "Please check your email and password";
                const res = yield chai_1.default.request(url).post("/auth/login").send(payload);
                (0, chai_1.expect)(res.status).to.equal(401);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("name", "AuthenticationException");
                (0, chai_1.expect)(res.body).to.haveOwnProperty("error", message);
            });
        });
        (0, mocha_1.it)("Login with correct credentials", function () {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const payload = { email: data.email, password: data.password };
                const res = yield chai_1.default.request(url).post("/auth/login").send(payload);
                const authorization = (_a = res.header["set-cookie"][0]) === null || _a === void 0 ? void 0 : _a.split("=");
                token = authorization[1].split(";")[0];
                const isValidJWT = yield jsonwebtoken_1.default.verify(token, index_1.default.secret);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.header["set-cookie"]).to.be.an("array");
                (0, chai_1.expect)(authorization[0]).to.be.equal("Authorization");
                (0, chai_1.expect)(isValidJWT).to.have.property("customerId");
                (0, chai_1.expect)(isValidJWT["customerId"]).to.equal(customerId);
                (0, chai_1.expect)(res.header["content-length"]).to.equal("143");
            });
        });
    });
    (0, mocha_1.describe)("[POST] Logout Endpoint", function () {
        (0, mocha_1.it)("should test for invalid auth token", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).post("/auth/logout");
                (0, chai_1.expect)(res.status).to.equal(401);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("name", "AuthenticationException");
                (0, chai_1.expect)(res.body).to.haveOwnProperty("error", "Invalid authentication token");
            });
        });
        (0, mocha_1.it)("should test for successful logout", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default
                    .request(url)
                    .post("/auth/logout")
                    .set("Authorization", "Bearer " + token);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.haveOwnProperty("message", "Logout Successfully");
            });
        });
    });
});
//# sourceMappingURL=auth.test.js.map
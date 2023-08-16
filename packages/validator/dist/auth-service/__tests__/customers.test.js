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
const mocha_1 = require("mocha");
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const config_1 = __importDefault(require("../src/config"));
chai_1.default.use(chai_http_1.default);
(0, mocha_1.describe)("Customer Endpoint Testing", function () {
    const url = config_1.default.api_Url || "http://localhost:8000/v1";
    const data = {
        firstName: "Unit",
        lastName: "Test",
        email: "unitest@gmail.com",
        password: "P@ssw0rd!",
        passwordConfirm: "P@ssw0rd!",
    };
    let id;
    (0, mocha_1.describe)("[POST] Create a new customer", function () {
        (0, mocha_1.it)("Create a new customer", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).post("/customers").send(data);
                (0, chai_1.expect)(res.status).to.be.equal(201);
                (0, chai_1.expect)(res.body).to.be.an("object");
                (0, chai_1.expect)(res.body).to.have.property("links");
                (0, chai_1.expect)(res.body).to.have.property("email").to.equal(data.email);
                (0, chai_1.expect)(res.body).to.have.property("isVerified").to.equal(false);
                id = res.body.customerId;
            });
        });
        (0, mocha_1.it)("Customer already exists", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const errorMessage = "Conflict:: Customer already exists.";
                const res = yield chai_1.default.request(url).post("/customers").send(data);
                (0, chai_1.expect)(res.status).to.be.equal(409);
                (0, chai_1.expect)(res.body).to.be.an("object");
                (0, chai_1.expect)(res.body).to.have.property("error").to.equal(errorMessage);
                (0, chai_1.expect)(res.body).to.have.property("name").to.equal("ConflictException");
            });
        });
        (0, mocha_1.it)("Invalid request payload", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const emptyData = {};
                const res = yield chai_1.default.request(url).post("/customers").send(emptyData);
                (0, chai_1.expect)(res.status).to.be.equal(400);
                (0, chai_1.expect)(res.body).to.be.an("object");
                (0, chai_1.expect)(res.body).to.have.property("errors");
                (0, chai_1.expect)(res.body.errors).to.be.an("array");
                (0, chai_1.expect)(res.body.errors[0]).to.have.property("firstName");
                (0, chai_1.expect)(res.body.errors[1]).to.have.property("lastName");
                (0, chai_1.expect)(res.body.errors[2]).to.have.property("email");
                (0, chai_1.expect)(res.body.errors[3]).to.have.property("password");
                (0, chai_1.expect)(res.body).to.have.property("name").to.equal("ValidationException");
            });
        });
    });
    (0, mocha_1.describe)("[GET] get customer", function () {
        (0, mocha_1.it)("Get customer by id", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).get(`/customers/${id}`);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.be.an("object");
                (0, chai_1.expect)(res.body).to.have.property("email");
                (0, chai_1.expect)(res.body).to.have.property("links");
                (0, chai_1.expect)(res.body).to.have.property("customerId");
                (0, chai_1.expect)(res.body).to.have.property("isVerified");
                (0, chai_1.expect)(res.body).to.not.have.property("password");
            });
        });
        (0, mocha_1.it)("Get all customers", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).get("/customers");
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.be.an("array");
            });
        });
    });
    (0, mocha_1.describe)("[UPDATE] get customer", function () {
        (0, mocha_1.it)("Update customer data", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = { firstName: "Karl", lastName: "Mark" };
                const keys = ["customerId", "firstName", "lastName", "email", "isVerified"];
                const res = yield chai_1.default.request(url).patch(`/customers/${id}`).send(data);
                (0, chai_1.expect)(res.status).to.equal(200);
                (0, chai_1.expect)(res.body).to.have.property("firstName").deep.equal(data.firstName);
                (0, chai_1.expect)(res.body).to.have.property("lastName").deep.equal(data.lastName);
                (0, chai_1.expect)(res.body).to.include.all.keys(...keys);
            });
        });
        (0, mocha_1.it)("Update password or email using wrong endpoint", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = { email: "Karl@email.com", password: "Mark123" };
                const res = yield chai_1.default.request(url).patch(`/customers/${id}`).send(data);
                (0, chai_1.expect)(res.status).to.equal(400);
                (0, chai_1.expect)(res.body.name).to.equal("BadRequestException");
            });
        });
    });
    (0, mocha_1.describe)("[DELETE] delete customer", function () {
        (0, mocha_1.it)("Delete customer by id", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).delete(`/customers/${id}`);
                (0, chai_1.expect)(res.status).to.equal(204);
            });
        });
        (0, mocha_1.it)("Delete customer by wrong id", function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield chai_1.default.request(url).delete(`/customers/${id}`);
                (0, chai_1.expect)(res.status).to.equal(404);
                (0, chai_1.expect)(res.body.name).to.equal("NotFoundException");
            });
        });
    });
});
//# sourceMappingURL=customers.test.js.map
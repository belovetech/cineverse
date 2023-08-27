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
const customers_model_1 = __importDefault(require("@models/customers.model"));
const filterCustomerData_1 = __importDefault(require("@utils/filterCustomerData"));
const exceptions_1 = require("@cineverse/exceptions");
const customerPayloadValidator_1 = require("@validators/customerPayloadValidator");
class CustomerService {
    static createCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new customerPayloadValidator_1.CustomerDataValidator(data);
            validator.validate();
            const customerExist = yield customers_model_1.default.findOne({ email: data.email }).exec();
            if (customerExist)
                throw new exceptions_1.ConflictException();
            const customer = yield customers_model_1.default.create(Object.assign({}, data));
            return customer;
        });
    }
    static findCustomerById(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerExist = yield customers_model_1.default.findById(customerId).exec();
            if (!customerExist)
                throw new exceptions_1.NotFoundException();
            return customerExist;
        });
    }
    static findAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = customers_model_1.default.find().exec();
            return customers;
        });
    }
    static updateCustomer(customerId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const filteredData = (0, filterCustomerData_1.default)(data);
            const customerExist = yield this.findCustomerById(customerId);
            if (!customerExist)
                throw new exceptions_1.NotFoundException();
            const updatedCustomer = yield customers_model_1.default.findByIdAndUpdate(customerId, filteredData, { new: true }).exec();
            updatedCustomer.save();
            return updatedCustomer;
        });
    }
    static deleteCustomer(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerExist = yield this.findCustomerById(customerId);
            if (!customerExist)
                throw new exceptions_1.NotFoundException();
            yield customers_model_1.default.findByIdAndDelete(customerId);
            return true;
        });
    }
}
exports.default = CustomerService;
//# sourceMappingURL=customer.service.js.map
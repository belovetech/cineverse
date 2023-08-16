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
exports.CustomerController = void 0;
const customer_service_1 = __importDefault(require("@services/customer.service"));
const apiResponseFormatter_1 = __importDefault(require("@utils/apiResponseFormatter"));
const responseLink_1 = require("@utils/responseLink");
class CustomerController {
    createCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerData = req.body;
                const customer = yield customer_service_1.default.createCustomer(customerData);
                const apiResponseFormatter = new apiResponseFormatter_1.default(customer, responseLink_1.POST_links);
                return res.status(201).json(apiResponseFormatter.format());
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getCustomers(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customers = yield customer_service_1.default.findAllCustomers();
                const formattedCustomers = customers.map(customer => new apiResponseFormatter_1.default(customer).format());
                return res.status(200).json(formattedCustomers);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield customer_service_1.default.findCustomerById(req.params.id);
                const apiResponseFormatter = new apiResponseFormatter_1.default(customer, responseLink_1.GET_links);
                return res.status(200).json(apiResponseFormatter.format());
            }
            catch (error) {
                return next(error);
            }
        });
    }
    updateCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCustomer = yield customer_service_1.default.updateCustomer(req.params.id, req.body);
                const apiResponseFormatter = new apiResponseFormatter_1.default(updatedCustomer, responseLink_1.UPDATE_links);
                return res.status(200).json(apiResponseFormatter.format());
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCustomer = yield customer_service_1.default.deleteCustomer(req.params.id);
                return res.status(204).json(deletedCustomer);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map
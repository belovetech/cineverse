"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("@controllers/customer.controller");
class CustomerRoute {
    constructor() {
        this.path = "/customers";
        this.router = (0, express_1.Router)();
        this.customerController = new customer_controller_1.CustomerController();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post(`${this.path}`, this.customerController.createCustomer);
        this.router.get(`${this.path}`, this.customerController.getCustomers);
        this.router.get(`${this.path}/:id`, this.customerController.getCustomer);
        this.router.patch(`${this.path}/:id`, this.customerController.updateCustomer);
        this.router.delete(`${this.path}/:id`, this.customerController.deleteCustomer);
    }
}
exports.default = CustomerRoute;
//# sourceMappingURL=customers.route.js.map
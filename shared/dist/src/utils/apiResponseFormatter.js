"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponseFormatter {
    constructor(customer, linkOptions) {
        var _a;
        this.customer = customer;
        this.linkOptions = linkOptions;
        this.customerId = ((_a = this.customer) === null || _a === void 0 ? void 0 : _a.customerId) || "";
    }
    getData(customer) {
        return {
            customerId: customer.customerId,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            isVerified: customer.isVerified,
        };
    }
    getLinks() {
        if (!this.linkOptions)
            return [];
        const links = this.linkOptions.map(link => {
            return {
                rel: link.rel || "self",
                href: `${link.href}/${link.action != "POST" ? this.customerId : ""}`,
                action: link.action,
                types: link.types || ["text/xml", "application/json"],
            };
        });
        return links;
    }
    format() {
        const response = Object.assign(Object.assign({}, this.getData(this.customer)), { links: this.getLinks() });
        return response;
    }
}
exports.default = ApiResponseFormatter;
//# sourceMappingURL=apiResponseFormatter.js.map
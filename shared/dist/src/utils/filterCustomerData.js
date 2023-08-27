"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const exceptions_1 = require("@cineverse/exceptions");
function filterCustomerData(data) {
    const { firstName, lastName, email, password } = data;
    const message = "Kindly use appropriate route to update your email or password";
    if (email || password)
        throw new exceptions_1.BadRequestException(message);
    return { firstName, lastName };
}
exports.default = filterCustomerData;
//# sourceMappingURL=filterCustomerData.js.map
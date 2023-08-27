"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const libs_1 = require("@cineverse/libs");
class ApiResponseFormatter {
    constructor(data, linkOptions) {
        this.data = data;
        this.linkOptions = linkOptions;
    }
    getData(data) {
        if (typeof data !== 'object' || data === null) {
            throw new libs_1.Exception('Data must be an object');
        }
        const dataValues = data['dataValues'];
        if (dataValues === undefined) {
            throw new libs_1.Exception('Invalid data format. Property "dataValues" not found');
        }
        const keys = Object.keys(dataValues);
        this.id = dataValues[keys[0]];
        return dataValues;
    }
    getLinks() {
        if (!this.linkOptions)
            return [];
        const links = this.linkOptions.map(link => {
            return {
                rel: link.rel || 'self',
                href: `${link.href}/${link.action != 'POST' ? this.id : ''}`,
                action: link.action,
                types: link.types || ['text/xml', 'application/json'],
            };
        });
        return links;
    }
    format() {
        const response = Object.assign(Object.assign({}, this.getData(this.data)), { links: this.getLinks() });
        return response;
    }
}
exports.default = ApiResponseFormatter;
//# sourceMappingURL=formatter.js.map
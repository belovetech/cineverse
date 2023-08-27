"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeaturesHandler {
    constructor(queryString) {
        this.queryString = queryString;
    }
    filter() {
        const filteredQuery = Object.assign({}, this.queryString);
        const excludedFields = ['limit', 'sort', 'fields', 'page'];
        excludedFields.forEach(field => delete filteredQuery[field]);
        return filteredQuery;
    }
    getFieldsQuery() {
        let fieldsQuery;
        if (this.queryString.fields) {
            fieldsQuery = this.queryString.fields.split(',');
        }
        else {
            fieldsQuery = { exclude: ['updatedAt'] };
        }
        return fieldsQuery;
    }
    sort() {
        const sortQuery = [];
        if (this.queryString.sort) {
            sortQuery.push(this.queryString.sort);
        }
        else {
            sortQuery.push('updatedAt');
        }
        sortQuery.push('DESC');
        return [sortQuery];
    }
    paginate() {
        this.page = parseInt(this.queryString.page);
        let limit = parseInt(this.queryString.limit);
        if (isNaN(this.page) || this.page <= 0)
            this.page = 1;
        if (isNaN(limit) || limit <= 0)
            limit = 5;
        const offset = (this.page - 1) * limit;
        return [offset, limit];
    }
    getMetadata({ total, itemPerPage }) {
        const limit = this.paginate()[1];
        const totalPage = Math.ceil(total / limit);
        const currentPage = this.page;
        const metadata = {
            total_items: total,
            item_per_page: itemPerPage,
            total_page: totalPage,
            previous_page: currentPage <= 1 ? null : currentPage - 1,
            current_page: currentPage,
            next_page: totalPage <= currentPage ? null : currentPage + 1,
        };
        return metadata;
    }
}
exports.default = ApiFeaturesHandler;
//# sourceMappingURL=api.features.js.map
import { FindAttributeOptions, Order } from 'sequelize';
type QueryType = Record<string, string>;
type PaginateResult = [number, number];
export interface Metadata {
    total: number;
    itemPerPage: number;
}
export default class ApiFeaturesHandler {
    private queryString;
    private page;
    constructor(queryString: QueryType);
    filter(): QueryType;
    getFieldsQuery(): string[] | FindAttributeOptions;
    sort(): Order;
    paginate(): PaginateResult;
    getMetadata(option: Metadata): {
        total_items: number;
        item_per_page: number;
        total_page: number;
        previous_page: number;
        current_page: number;
        next_page: number;
    };
}
export {};

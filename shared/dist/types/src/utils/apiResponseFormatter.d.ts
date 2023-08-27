import { IResponse, ILink } from "@interfaces/response.interface";
import { ICustomer } from "@interfaces/customers.interface";
interface ICustomerOptional {
    createdAt?: string;
    updatedAt?: string;
}
type Customer = ICustomer & ICustomerOptional;
export default class ApiResponseFormatter {
    private customer;
    private linkOptions;
    private customerId;
    constructor(customer: Customer, linkOptions?: Array<ILink>);
    private getData;
    private getLinks;
    format(): IResponse;
}
export {};

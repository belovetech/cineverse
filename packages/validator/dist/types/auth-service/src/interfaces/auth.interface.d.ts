import { ICustomer } from "./customers.interface";
import { Request } from "express";
export interface IRequest extends Request {
    customer: ICustomer;
}

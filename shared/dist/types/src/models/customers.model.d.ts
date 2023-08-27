import { Schema } from "mongoose";
import { CustomerModel } from "@interfaces/customers.interface";
export declare const customerSchema: Schema<CustomerModel>;
declare const Customer: import("mongoose").Model<CustomerModel, {}, {}, {}, import("mongoose").Document<unknown, {}, CustomerModel> & CustomerModel & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
export default Customer;

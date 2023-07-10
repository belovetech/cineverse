import * as dotenv from 'dotenv';
import { ApiResponse, IResponse } from '@interfaces/response.interface';
import { ICustomer } from '@interfaces/customers.interface';
import { Request } from 'express';

dotenv.config({ path: __dirname + '/../.env' });

type Customer = ICustomer & { createdAt?: string; updatedAt?: string };

export default class ApiResponseFormatter {
  private customer: ICustomer;
  private req: Request;
  private url: string;
  private baseUrl: string = process.env.URL;

  constructor(req: Request, customer?: Customer) {
    this.customer = customer;
    this.req = req;
    this.url = `${this.req.protocol}://${req.get('host')}${this.req.originalUrl}`;
  }

  public getData(customer: Customer) {
    return {
      customerId: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      isVerified: customer.isVerified,
    };
  }

  private addBaseUrl(paths: object) {
    const constructedPaths = {};
    for (let key in paths) {
      constructedPaths[key] = `${this.baseUrl}/${paths[key]}`;
    }
    return constructedPaths;
  }

  public format(options: { paths: object; message?: string }) {
    const paths = this.addBaseUrl(options.paths);
    const response: ApiResponse<IResponse> = {
      success: true,
      message: options.message,
      data: this.getData(this.customer),
      links: {
        self: this.url,
        related: { ...paths },
      },
    };
    if (!options.message) delete response.message;
    return response;
  }
}

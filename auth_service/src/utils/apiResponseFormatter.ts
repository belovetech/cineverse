import { IResponse, ILink } from '@interfaces/response.interface';
import { ICustomer } from '@interfaces/customers.interface';

interface ICustomerOptional {
  createdAt?: string;
  updatedAt?: string;
  token?: string;
}

type Customer = ICustomer & ICustomerOptional;

export default class ApiResponseFormatter {
  private customer: ICustomer;
  private linkOptions: Array<ILink>;
  private customerId: string;

  constructor(customer: Customer, linkOptions?: Array<ILink>) {
    this.customer = customer;
    this.linkOptions = linkOptions;
    this.customerId = this.customer?.customerId || '';
  }

  private getData(customer: Customer): Customer {
    return {
      customerId: customer.customerId,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      isVerified: customer.isVerified,
      token: customer?.token,
    };
  }

  private getLinks(): Array<ILink> {
    if (!this.linkOptions) return [];
    const links = this.linkOptions.map(link => {
      return {
        rel: link.rel || 'self',
        href: `${link.href}/${link.action != 'POST' ? this.customerId : ''}`,
        action: link.action,
        types: link.types || ['text/xml', 'application/json'],
      };
    });
    return links;
  }

  public format(): IResponse {
    const response: IResponse = {
      ...this.getData(this.customer),
      links: this.getLinks(),
    };
    return response;
  }
}

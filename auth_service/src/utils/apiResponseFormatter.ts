import { IResponse, ILink } from '@interfaces/response.interface';
import { ICustomer } from '@interfaces/customers.interface';

type Customer = ICustomer & { createdAt?: string; updatedAt?: string };

export default class ApiResponseFormatter {
  private customer: ICustomer;
  private linkOptions: Array<ILink>;
  private customerId: string;

  constructor(customer?: Customer, linkOptions?: Array<ILink>) {
    this.customer = customer;
    this.linkOptions = linkOptions;
    this.customerId = this.customer?.customerId || '';
  }

  public static getData(customer: Customer) {
    return {
      customerId: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      isVerified: customer.isVerified,
    };
  }

  private getLinks(): Array<ILink> {
    const links = this.linkOptions.map(link => {
      return {
        rel: link.rel || 'self',
        href: `${link.href}/${this.customerId}`,
        action: link.action,
        types: link.types || ['text/xml', 'application/json'],
      };
    });
    return links;
  }

  public format(): IResponse {
    const response: IResponse = {
      ...ApiResponseFormatter.getData(this.customer),
      links: this.getLinks(),
    };
    return response;
  }
}

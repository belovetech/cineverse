import { ILink } from '@interfaces/link.interface';
import { Exception } from '@cineverse/exceptions';

export default class ApiResponseFormatter<T> {
  private data: T;
  private linkOptions?: ILink[];
  private id: string | undefined;

  constructor(data: T, linkOptions?: ILink[]) {
    this.data = data;
    this.linkOptions = linkOptions;
  }

  private getData(data: T): T {
    if (typeof data !== 'object' || data === null) {
      throw new Exception('Data must be an object');
    }
    const dataValues = data['dataValues'];
    if (dataValues === undefined) {
      throw new Exception('Invalid data format. Property "dataValues" not found');
    }
    const keys = Object.keys(dataValues);
    this.id = dataValues[keys[0]];
    return dataValues as T;
  }

  private getLinks(): ILink[] {
    if (!this.linkOptions) return [];
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

  public format(): Record<string, unknown> {
    const response = {
      ...this.getData(this.data),
      links: this.getLinks(),
    };
    return response;
  }
}

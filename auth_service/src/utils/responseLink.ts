import config from '@config';
import { ILink } from '@interfaces/response.interface';

const baseUrl = config.baseUrl;

export const GET_links: Array<ILink> = [
  {
    rel: 'self',
    href: `${baseUrl}/customer`,
    action: 'GET',
    types: ['text/xml', 'application/json'],
  },
  {
    rel: 'customer',
    href: `${baseUrl}/customer`,
    action: 'UPDATE',
    types: ['text/xml', 'application/json'],
  },
];

export const UPDATE_links: Array<ILink> = [
  {
    rel: 'self',
    href: `${baseUrl}/customer`,
    action: 'UPDATE',
    types: ['text/xml', 'application/json'],
  },
  {
    rel: 'customer',
    href: `${baseUrl}/customer`,
    action: 'GET',
    types: ['text/xml', 'application/json'],
  },
];

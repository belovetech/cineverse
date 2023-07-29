import config from '@config';
import { ILink } from '@interfaces/link.interface';

const baseUrl = config.baseUrl;

type LinkMethods = 'post' | 'get' | 'update';

export const movieLinks: Record<LinkMethods, ILink[]> = {
  post: [
    {
      rel: 'self',
      href: `${baseUrl}/movie`,
      action: 'POST',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'movie',
      href: `${baseUrl}/movie`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
  ],
  get: [
    {
      rel: 'self',
      href: `${baseUrl}/movie`,
      action: 'GET',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'movie',
      href: `${baseUrl}/movie`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
  ],
  update: [
    {
      rel: 'self',
      href: `${baseUrl}/movie`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'movie',
      href: `${baseUrl}/movie`,
      action: 'GET',
      types: ['text/xml', 'application/json'],
    },
  ],
};

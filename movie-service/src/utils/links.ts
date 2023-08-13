import config from '@config';
import { ILink } from '@interfaces/link.interface';

const baseUrl = config.baseUrl;

type LinkMethods = 'post' | 'get' | 'update';

export const movieLinks: Record<LinkMethods, ILink[]> = {
  post: [
    {
      rel: 'self',
      href: `${baseUrl}/movies`,
      action: 'POST',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'movie',
      href: `${baseUrl}/movies`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
  ],
  get: [
    {
      rel: 'self',
      href: `${baseUrl}/movies`,
      action: 'GET',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'movie',
      href: `${baseUrl}/movies`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
  ],
  update: [
    {
      rel: 'self',
      href: `${baseUrl}/movies`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'movie',
      href: `${baseUrl}/movies`,
      action: 'GET',
      types: ['text/xml', 'application/json'],
    },
  ],
};

export const theaterLinks: Record<LinkMethods, ILink[]> = {
  post: [
    {
      rel: 'self',
      href: `${baseUrl}/theaters`,
      action: 'POST',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'theater',
      href: `${baseUrl}/theaters`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
  ],
  get: [
    {
      rel: 'self',
      href: `${baseUrl}/theaters`,
      action: 'GET',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'theater',
      href: `${baseUrl}/theaters`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
  ],
  update: [
    {
      rel: 'self',
      href: `${baseUrl}/theaters`,
      action: 'UPDATE',
      types: ['text/xml', 'application/json'],
    },
    {
      rel: 'theater',
      href: `${baseUrl}/theaters`,
      action: 'GET',
      types: ['text/xml', 'application/json'],
    },
  ],
};

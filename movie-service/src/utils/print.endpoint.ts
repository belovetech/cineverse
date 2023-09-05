import expressListEndpoints from 'express-list-endpoints';
import { Application } from 'express';
import { logger } from '@cineverse/libs';

export interface EndpointAttributes {
  methods: string[];
  path: string;
  middleware: string[];
}

export const getEndPoints = (app: Application): EndpointAttributes[] => {
  return expressListEndpoints(app);
};

export function printEndpoints(app: Application): void {
  const endpoints = getEndPoints(app);
  logger.info('┌───────────────────────────────────────────────────────┐');
  logger.warn('│   Available Endpoints (HTTP Method | URL)  🚀         │');
  logger.info('└───────────────────────────────────────────────────────┘');
  const baseUrl = process.env.BASE_URL?.slice(0, -3) || 'http://localhost:8000';

  const methods2dArray = concatMethods(endpoints.slice(0, -1));
  const [longestMethods, len] = longestLength(methods2dArray);
  const longestPath = getlongestPath(endpoints);

  endpoints.forEach(endpoint => {
    if (endpoint.path !== '*') {
      const length = endpoint.methods.length;
      const diff = len - length;
      const rightSpaces = ' '.repeat(longestMethods + diff - endpoint.methods.join('').length);
      const leftSpaces = ' '.repeat(longestPath - `${endpoint.path}`.length);
      logger.info(`│  ${endpoint.methods.join(',')}${rightSpaces} │\t${baseUrl}${endpoint.path}${leftSpaces}\t│`);
    }
  });
  logger.info('└───────────────────────────────────────────────────────┘');
}

export const concatMethods = (endpoints: EndpointAttributes[]): string[][] => {
  const methods2dArray: string[][] = [];
  endpoints.forEach(endpoint => {
    methods2dArray.push(endpoint.methods);
  });
  return methods2dArray;
};

export const longestLength = (methods: string[][]): [number, number] => {
  let longest = 0;
  let len = 0;
  methods.forEach((method: string[]) => {
    const methodsLength = method.join('').length;
    if (methodsLength > longest) longest = methodsLength;
    if (method.length > len) len = method.length;
  });
  return [longest, len];
};

export const getlongestPath = (routes: EndpointAttributes[]): number => {
  return routes.reduce((acc, curr) => (acc > curr.path.length ? acc : curr.path.length), 0);
};

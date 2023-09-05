import { Application } from 'express';
import expressListEndpoints from 'express-list-endpoints';
import { logger } from './index';

// TODO: move to the packages
interface EndpointAttributes {
  methods: string[];
  path: string;
  middleware: string[];
}

export default class EndpointLogger {
  private app: Application;
  private baseUrl: string;
  public endpoints: any;

  constructor(app: Application) {
    this.app = app;
    this.baseUrl =
      process.env.BASE_URL?.slice(0, -3) || 'http://localhost:8000';
    this.endpoints = expressListEndpoints(this.app);
  }

  public log(): void {
    this.logger();
  }

  private logger(): void {
    logger.info(
      '┌───────────────────────────────────────────────────────────────┐'
    );
    logger.warn(
      '│           Available Endpoints (HTTP Method | URL)  🚀         │'
    );
    logger.info(
      '└───────────────────────────────────────────────────────────────┘'
    );

    this.endpoints.forEach((route) => {
      if (route.path !== '*') {
        const rightSpaces = this.calaculateLeftSpaces(
          route.methods,
          route.methods.join('').length
        );

        const leftSpaces = this.calaculateRightSpaces(route.path);

        logger.info(
          `│  ${route.methods.join(',')}${leftSpaces}  |\t${this.baseUrl}${
            route.path
          }${rightSpaces}     │`
        );
      }
    });
    logger.info(
      '└───────────────────────────────────────────────────────────────┘'
    );
  }

  public concatMethods = (endpoints: EndpointAttributes[]): string[][] => {
    const methods2dArray: string[][] = [];
    endpoints.forEach((route) => {
      methods2dArray.push(route.methods);
    });
    return methods2dArray;
  };

  public longestMethodStringLengthAndItemLength(
    methods: string[][]
  ): [number, number] {
    let longestMethodStringLength = 0;
    let lengthOfItem = 0;

    methods.forEach((method: string[]) => {
      const methodsLength = method.join('').length;

      if (methodsLength > longestMethodStringLength) {
        longestMethodStringLength = methodsLength;
      }

      if (method.length > lengthOfItem) lengthOfItem = method.length;
    });

    return [longestMethodStringLength, lengthOfItem];
  }

  public getlongestPath(): number {
    return this.endpoints.reduce(
      (acc, curr) => (acc > curr.path.length ? acc : curr.path.length),
      0
    );
  }

  public calaculateLeftSpaces(methods: string[], methodStringLength: number) {
    // get all methods except the last one and concat them into 2d array
    const methods2dArray = this.concatMethods(
      this.endpoints.slice(0, -1) as EndpointAttributes[]
    );

    // get the longest method string length and the length of the item
    const [longestMethodStringLength, lengthOfItem] =
      this.longestMethodStringLengthAndItemLength(methods2dArray);

    // calculate the difference between the length of the longest item and the length of the current item
    const spaceDiff = lengthOfItem - methods.length;

    // calculate the right spaces
    const rightSpaces = ' '.repeat(
      Math.abs(longestMethodStringLength + spaceDiff - methodStringLength)
    );

    return rightSpaces;
  }

  public calaculateRightSpaces(path: string): string {
    const leftSpaces = ' '.repeat(this.getlongestPath() - `${path}`.length);
    return leftSpaces;
  }
}



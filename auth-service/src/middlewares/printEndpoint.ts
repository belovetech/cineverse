import App from "@app";
import expressListEndpoints from "express-list-endpoints";
import { logger } from "@cineverse/libs";

// TODO: move to the packages
interface EndpointAttributes {
  methods: string[];
  path: string;
  middleware: string[];
}

export default function printEndpoints(app: App): void {
  const routes = expressListEndpoints(app.getServer());
  logger.info("┌───────────────────────────────────────────────────────────────┐");
  logger.warn("│           Available Routes (HTTP Method | URL)  🚀            │");
  logger.info("└───────────────────────────────────────────────────────────────┘");
  const baseUrl = process.env.BASE_URL.slice(0, -3) || "http://localhost:8000";

  const methods2dArray = concatMethods(routes.slice(0, -1) as EndpointAttributes[]);
  const [longestMethods, len] = longestLength(methods2dArray);
  const longestPath = getlongestPath(routes);

  routes.forEach(route => {
    if (route.path !== "*") {
      const length = route.methods.length;
      const diff = len - length;
      const rightSpaces = " ".repeat(longestMethods + diff - route.methods.join("").length);
      const leftSpaces = " ".repeat(longestPath - `${route.path}`.length);
      logger.info(`│  ${route.methods.join(",")}${rightSpaces}  |\t${baseUrl}${route.path}${leftSpaces}      │`);
    }
  });
  logger.info("└───────────────────────────────────────────────────────────────┘");
}

const concatMethods = (routes: EndpointAttributes[]): string[][] => {
  const methods2dArray: string[][] = [];
  routes.forEach(route => {
    methods2dArray.push(route.methods);
  });
  return methods2dArray;
};

const longestLength = (methods: string[][]): [number, number] => {
  let longest = 0;
  let len = 0;
  methods.forEach((method: string[]) => {
    const methodsLength = method.join("").length;
    if (methodsLength > longest) longest = methodsLength;
    if (method.length > len) len = method.length;
  });
  return [longest, len];
};

const getlongestPath = (routes: EndpointAttributes[]): number => {
  return routes.reduce((acc, curr) => (acc > curr.path.length ? acc : curr.path.length), 0);
};

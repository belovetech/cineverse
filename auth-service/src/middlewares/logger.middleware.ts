import App from "@app";
import listEndpoints from "express-list-endpoints";
import { logger } from "@cineverse/libs";

interface EndpointAttributes {
  methods: string[];
  path: string;
  middleware: string[];
}

export default function loggerMiddleware(app: App): void {
  const routes = listEndpoints(app.getServer());
  logger.info("┌───────────────────────────────────────────────────────────────┐");
  logger.info("│          Available Routes (HTTP Method | URL)                 │");
  logger.info("└───────────────────────────────────────────────────────────────┘");
  const baseUrl = process.env.BASE_URL.slice(0, -3) || "http://localhost:8000";

  const methods2dArray = concatMethods(routes.slice(0, -1) as EndpointAttributes[]);
  const longestMethods = longestLength(methods2dArray);
  const longestPath = getlongestPath(routes);

  routes.forEach(route => {
    if (route.path !== "*") {
      const rightSpaces = " ".repeat(longestMethods - route.methods.join("").length);
      const leftSpaces = " ".repeat(longestPath - `${route.path}`.length );
      logger.info(`│  ${route.methods.join("")}${rightSpaces}|\t${baseUrl}${route.path}${leftSpaces}\t│`);
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

const longestLength = (methods: string[][]): number => {
  let longest = 0;
  let maxElement = 0;
  methods.forEach((method: string[]) => {
    const methodsLength = method.join("").length;
    if (methodsLength > longest) longest = methodsLength;
    if (method.length > maxElement) maxElement = method.length;
  });
  return longest + maxElement;
};

const getlongestPath = (routes: EndpointAttributes[]): number => {
  return routes.reduce((acc, curr) => (acc > curr.path.length ? acc : curr.path.length), 0);
};

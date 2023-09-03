import { logger } from "@cineverse/libs";
import { IPathsArray } from "@interfaces/routes.interface";

export default function printPaths(pathsArray: IPathsArray): void {
  logger.info("===============PATHS===================");
  pathsArray.forEach(path => {
    const description = path.description ? ` - ${path.description}` : "";
    logger.info(`${path.method} - ${path.path}\t${description}`);
  });
}

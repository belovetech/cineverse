import App from "@app";
import printPaths from "@utils/printPaths";
import { authRoute, customerRoute, healthcheckRoute } from "@routes";

// API Server
const app = new App([authRoute, customerRoute, healthcheckRoute]);
app.listen();

// Print all paths
printPaths(authRoute.getPaths());
printPaths(customerRoute.getPaths());
printPaths(healthcheckRoute.getPaths());

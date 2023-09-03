import App from "@app";
import { loggerMiddleware } from "@middlewares";
import { authRoute, customerRoute, healthcheckRoute } from "@routes";

// Initialize the app with routes
const app = new App([authRoute, customerRoute, healthcheckRoute]);

// Start the server
app.listen();
loggerMiddleware(app);

// import listEndpoints from "express-list-endpoints";
// listEndpoints(app.getServer()).forEach(path => console.log(path));

// Print all paths
// (() => {
//   setTimeout(() => {
//     const allPaths = [...authRoute.getPaths(), ...customerRoute.getPaths(), ...healthcheckRoute.getPaths()];
//     loggerMiddleware(allPaths);
//   }, 2000);
// })();

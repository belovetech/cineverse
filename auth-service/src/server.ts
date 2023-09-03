import App from "@app";
import { loggerMiddleware } from "@middlewares";
import { authRoute, customerRoute, healthcheckRoute } from "@routes";

// Initialize the app with routes
const app = new App([authRoute, customerRoute, healthcheckRoute]);

// Start the server
app.listen();

// Print all the available endpoints
(() => {
  setTimeout(() => {
    loggerMiddleware(app);
  }, 1000);
})();

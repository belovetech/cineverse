import App from "@app";
import { printEndpoints } from "@middlewares/index";
import { authRoute, customerRoute, healthcheckRoute } from "@routes";

// Initialize the app with routes
const app = new App([authRoute, customerRoute, healthcheckRoute]);

// Start the server
app.listen();

// Print all the available endpoints
(() => {
  setTimeout(() => {
    printEndpoints(app);
  }, 1000);
})();

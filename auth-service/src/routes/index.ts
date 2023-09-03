import AuthRoute from "./auth.route";
import CustomerRoute from "./customers.route";
import HealthCheckRoute from "./healthcheck.route";


export const authRoute = new AuthRoute();
export const customerRoute = new CustomerRoute();
export const healthcheckRoute = new HealthCheckRoute();

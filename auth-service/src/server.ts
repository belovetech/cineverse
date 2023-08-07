import App from "@app";
import AuthRoute from "@routes/auth.route";
import CustomerRoute from "@routes/customers.route";
import HealthCheckRoute from "@routes/healthcheck.route";
import IRoute from "@interfaces/routes.interface";

const routes: IRoute[] = [new HealthCheckRoute(), new CustomerRoute(), new AuthRoute()];
const app = new App(routes);
app.listen();

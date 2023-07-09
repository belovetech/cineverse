import App from '@app';
import HealthCheckRoute from '@routes/healthcheck.route';
import CustomerRoute from '@routes/customers.route';
import IRoute from '@interfaces/routes.interface';

const routes: IRoute[] = [new HealthCheckRoute(), new CustomerRoute()];
const app = new App(routes);
app.listen();

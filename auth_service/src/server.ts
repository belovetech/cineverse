import App from '@/app';
import HealthCheckRoute from '@routes/healthcheck.route';
import CustomerRoute from './routes/customers.route';

const app = new App([new HealthCheckRoute(), new CustomerRoute()]);
app.listen();

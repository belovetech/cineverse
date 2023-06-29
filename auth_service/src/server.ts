import App from '@/app';
import HealthCheckRoute from '@routes/healthcheck.route';

const app = new App([new HealthCheckRoute()]);

app.listen();

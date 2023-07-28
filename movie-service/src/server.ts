import App from '@app';
import HealthCheckRoute from '@routes/healthcheck.route';
import MovieRoute from '@routes/movie.route';

const app = new App([new HealthCheckRoute(), new MovieRoute()]);
app.listen();

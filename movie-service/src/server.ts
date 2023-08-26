import App from '@app';
import { healthcheckRoute, movieRoute, theaterRoute, showtimeRoute } from '@routes';

const app = new App([healthcheckRoute, movieRoute, theaterRoute, showtimeRoute]);
app.listen();

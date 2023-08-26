import App from '@app';
import { healthcheckRoute, movieRoute, theaterRoute, showtimeRoute, seatRoute } from '@routes';

const app = new App([healthcheckRoute, movieRoute, theaterRoute, showtimeRoute, seatRoute]);
app.listen();

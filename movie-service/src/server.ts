import App from '@app';
import { healthcheckRoute, movieRoute, theaterRoute, showtimeRoute, seatRoute } from '@routes';
import { printEndpoints } from './utils/print.endpoint';

const app = new App([healthcheckRoute, movieRoute, theaterRoute, showtimeRoute, seatRoute]);

app.listen();

(() => {
  setTimeout(() => {
    printEndpoints(app.getServer());
  }, 1000);
})();

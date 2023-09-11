import App from '@app';
import { healthcheckRoute, bookingRoute } from '@routes';

const app = new App([healthcheckRoute, bookingRoute]);
app.listen();

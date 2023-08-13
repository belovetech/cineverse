import App from '@app';
import { healthcheckRoute, movieRoute, theaterRoute } from '@routes';

const app = new App([healthcheckRoute, movieRoute, theaterRoute]);
app.listen();

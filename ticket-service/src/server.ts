import App from '@app';
import { healthcheckRoute } from '@routes';

const app = new App([healthcheckRoute]);
app.listen();

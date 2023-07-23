import swaggerAutoGen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Authentication service',
    description: 'Movie ticketing system auth service',
  },
  host: 'localhost:8000/v1',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointFiles = ['./routes/customers.route.ts', './routes/healthcheck.route.ts'];
swaggerAutoGen()(outputFile, endpointFiles, doc);

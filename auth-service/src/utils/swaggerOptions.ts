const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Authentication service',
      description: 'Movie ticketing system auth service',
    },
    servers: [
      {
        url: 'http://localhost:8000/v1',
      },
    ],
    schemes: ['http'],
  },
  apis: ['swagger.yaml'],
};

export default options;

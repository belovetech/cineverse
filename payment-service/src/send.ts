#!/usr/bin/env ts-node

import * as Amqp from 'amqp-ts';

const connection = new Amqp.Connection('amqp://localhost');
const exchange = connection.declareExchange('paymentExchange');

connection.completeConfiguration().then(() => {
  const msg = new Amqp.Message(process.argv[2]);
  exchange.send(msg);
});

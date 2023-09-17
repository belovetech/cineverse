#!/usr/bin/env ts-node

import * as Amqp from 'amqp-ts';

const connection = new Amqp.Connection('amqp://localhost');
const exchange = connection.declareExchange('paymentExchange');
const queue = connection.declareQueue('paymentQueue');
queue.bind(exchange);

queue.activateConsumer((message) => {
  console.log('Message', message.getContent());
});

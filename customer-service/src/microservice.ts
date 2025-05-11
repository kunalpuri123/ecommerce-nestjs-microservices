import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL!], // Add non-null assertion
    queue: 'order_created',
    queueOptions: {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'dlx_orders'
      }
    },
  },
};
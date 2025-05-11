import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 1) Create the Nest application (this covers HTTP, if you have any)
  const app = await NestFactory.create(AppModule);

  // 2) Connect the RMQ microservice transport
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],  // the same broker
      queue: 'order_queue',                        // must match the queue name you emit into
      queueOptions: { durable: true },
    },
  });
  app.connectMicroservice({
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://guest:guest@rabbitmq:5672'],
    queue: 'order_created',
    queueOptions: { durable: true },
  },
});
await app.startAllMicroservices();


  // 3) Start the RMQ microservice so @EventPattern handlers are registered
  await app.startAllMicroservices();

  // 4) (Optional) start the HTTP server too, if you expose REST endpoints
  await app.listen(3002);
  console.log('🚀 Customer service running with RMQ listener');
}
bootstrap();

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  // 1) Create your main Nest app
  const app = await NestFactory.create(AppModule);

  // 2) Connect the RMQ microservice transport
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@rabbitmq:5672'],
      queue: 'order_created',
      queueOptions: { durable: true },
    },
  });

  // 3) Start all connected microservices (RMQ in this case)
  await app.startAllMicroservices();

  // 4) Optionally also start HTTP server if you have REST endpoints
  await app.listen(3001);
  console.log(`🚀 Product service running on http://localhost:3001`);
}

bootstrap();

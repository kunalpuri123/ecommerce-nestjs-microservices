// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { Order } from './products/entities/order.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres-products',   // your Docker service name
      port: 5432,
      username: 'user',
      password: 'kunal123',
      database: 'products_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),

    // ← Register the RMQ client here
    ClientsModule.register([
      {
        name: 'ORDER_QUEUE_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'order_created',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AppModule {}

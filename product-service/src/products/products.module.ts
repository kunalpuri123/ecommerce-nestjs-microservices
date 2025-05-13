import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Order } from './entities/order.entity'; // Add this import
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([{
      name: 'ORDER_QUEUE_CLIENT', // Match injection token
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'order_created', // Consistent queue name
        queueOptions: { durable: true }
      }
    }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
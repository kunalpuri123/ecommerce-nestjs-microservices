import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Order } from './entities/order.entity'; // Add this import

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]) // Register Order entity
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
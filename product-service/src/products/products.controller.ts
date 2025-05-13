import { Controller, Get, Param, Post, Body, Inject } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { isUUID } from 'class-validator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('ORDER_QUEUE_CLIENT') private readonly client: ClientProxy
  ) {}

  @Post('orders')
  async createOrder(@Body() orderData: any) {
    
    const order = await this.productsService.createOrder(orderData);
    
    // Emit event with proper error handling
    try {
      this.client.emit('order_created', order);
      console.log('🚀 Event emitted successfully');
    } catch (error) {
      console.error('💥 Event emission failed:', error);
      throw error;
    }
    
    return order;
  }

  @Get('orders/customer/:customerId')
  async getCustomerOrders(@Param('customerId') customerId: string) {
    return this.productsService.getCustomerOrders(customerId);
  }
}
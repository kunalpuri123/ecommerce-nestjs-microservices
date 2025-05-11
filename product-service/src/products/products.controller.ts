import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('order_created')
  @Post('orders')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.productsService.createOrder(createOrderDto);
  }
  
  @Get('orders/customer/:customerId')
  async getCustomerOrders(@Param('customerId') customerId: string) {
    return this.productsService.getCustomerOrders(customerId);
  }
}
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CustomersService } from './customers/customers.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly customersService: CustomersService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
async handleOrderCreated(@Payload() data: any) {
  console.log('🔥 Received RAW DATA:', data);
  // Add explicit validation
  if (!data?.customerId) {
    console.error('💥 Invalid order data:', data);
    return;
  }
  await this.customersService.updateOrderStats(data.customerId, data);
}


}
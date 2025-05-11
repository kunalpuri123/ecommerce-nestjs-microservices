import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from './customers/customers.service';

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

  // Add RabbitMQ message handler
  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() data: { customerId: string; amount: number }) {
    await this.customersService.updateOrderStats(data.customerId, data.amount);
    return { status: 'Customer stats updated' };
  }
}
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  Delete 
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { EventPattern } from '@nestjs/microservices';
import { MessagePattern, Payload } from '@nestjs/microservices';



@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // @Post()
  // create(@Body() createCustomerDto: CreateCustomerDto) {
  //   return this.customersService.create(createCustomerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.customersService.findAll();
  // }





  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customersService.remove(id);
  // }

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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }



  async remove(id: string): Promise<void> {
    await this.customersRepository.delete(id);
  }

  async updateOrderStats(customerId: string, orderData: any) {
  const existingCustomer = await this.customersRepository.findOneBy({ id: customerId });

  if (existingCustomer) {
    await this.customersRepository.update(
      { id: customerId },
      {
        totalOrders: () => `"totalOrders" + 1`,
        totalSpent: () => `"totalSpent" + ${orderData.total}`,
        lastOrderAt: new Date(orderData.createdAt)
      }
    );
  } else {
    const newCustomer = this.customersRepository.create({
      id: orderData.customerId,
      name: orderData.name || 'Unknown',
      email: orderData.email || 'unknown@example.com',
      totalOrders: 1,
      totalSpent: orderData.total,
      lastOrderAt: new Date(orderData.createdAt)
    });
    await this.customersRepository.save(newCustomer);
  }
}

}
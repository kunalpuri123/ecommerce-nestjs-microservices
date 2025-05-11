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

  async updateOrderStats(customerId: string, amount: number): Promise<void> {
    await this.customersRepository
      .createQueryBuilder()
      .update(Customer)
      .set({
        totalOrders: () => 'totalOrders + 1',
        totalSpent: () => `totalSpent + ${amount}`,
        lastOrderAt: new Date(),
      })
      .where('id = :id', { id: customerId })
      .execute();
  }
}
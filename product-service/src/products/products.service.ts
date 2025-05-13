// src/products.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    // ← Inject the named client proxy
    @Inject('ORDER_QUEUE_CLIENT')
    private readonly client: ClientProxy,
  ) {}

async createOrder(dto: CreateOrderDto): Promise<Order> {

  const order = this.ordersRepository.create({
    customerId: dto.customerId,
    items: dto.items,
    total: dto.total,

  });

  const saved = await this.ordersRepository.save(order);

  await this.client.emit('order_created', {
    orderId: saved.id,
    customerId: saved.customerId,
    amount: saved.total,
  }).toPromise();

  return saved;
}


  async getCustomerOrders(customerId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { customerId },
      order: { createdAt: 'DESC' },
    });
  }
}

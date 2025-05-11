// src/entities/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customerId: string;

  @Column('jsonb', { nullable: false, default: [] })
  items: { productId: string; quantity: number; price: number }[];

  @Column('decimal')
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}

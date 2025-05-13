import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Customer {
   @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column({ default: 0 })
  totalOrders: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalSpent: number;

  @Column({ nullable: true })
  lastOrderAt: Date;

  @Column()
  name: string;

  @Column()
  email: string;
}
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Customer } from './customers/entities/customer.entity/customer.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        entities: [Customer],
        synchronize: true,
        ssl: configService.get('NODE_ENV') === 'production' ? { 
          rejectUnauthorized: false 
        } : false
      }),
      inject: [ConfigService],
    }),
ClientsModule.registerAsync([{
  name: 'ORDER_SERVICE',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL', 'amqp://localhost:5672')], // Fallback value
      queue: 'order_created',
      queueOptions: {
        durable: true,
        arguments: { 
          'x-queue-type': 'classic' as const,
          'x-message-ttl': 3600000 // Example additional argument
        }
      }
    }
  }),
  inject: [ConfigService]
}]),
    CustomersModule
  ],
})
export class AppModule {}
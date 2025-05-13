// lib/rabbitmq.ts
import * as amqp from 'amqplib';

// Define proper TypeScript interfaces
interface RabbitMQConnection {
  connection: amqp.Connection;
  channel: amqp.Channel;
}

let connection: amqp.Connection;
let channel: amqp.Channel;

export async function connectRabbitMQ(): Promise<RabbitMQConnection> {
  if (!connection) {
    connection = await amqp.connect(
      process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672'
    );
    
    // Create channel with proper typing
    channel = await connection.createChannel();
    
    // Assert queue with correct options
    await channel.assertQueue('order_queue', {
      durable: true,
      arguments: { 'x-queue-type': 'classic' }
    });
  }

  return { connection, channel };
}

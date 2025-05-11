// lib/rabbitmq.ts
import amqp from "amqplib";

let connection: amqp.Connection | null = null;

export async function getRabbitMQChannel() {
  if (!connection) {
    // Use the Docker hostname or environment variable
    connection = await amqp.connect("amqp://guest:guest@localhost:5672"); 
  }

  const channel = await connection.createChannel();
  await channel.assertQueue("orders", { durable: true });

  return channel;
}

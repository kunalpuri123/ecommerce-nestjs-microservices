// lib/customer-rabbitmq.ts
import amqp from "amqplib";

let connection: amqp.Connection | null = null;

export async function getCustomerChannel() {
  if (!connection) {
    connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  }

  const channel = await connection.createChannel();
  await channel.assertQueue("customers", { durable: true });

  return channel;
}

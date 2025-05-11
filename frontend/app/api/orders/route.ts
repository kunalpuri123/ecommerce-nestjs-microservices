// pages/api/orders.ts
import { NextResponse } from "next/server";
import { getRabbitMQChannel } from "@/lib/rabbitmq";

export async function POST(request: Request) {
  try {
    const order = await request.json();

    // Validate order data
    if (!order.customerId || !order.items?.length) {
      return NextResponse.json(
        { success: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    const channel = await getRabbitMQChannel();
    
    // Ensure queue exists
    await channel.assertQueue("order_created", {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': 'dlx_orders' // For failed messages
      }
    });

    // Add metadata to message
    const message = {
      ...order,
      timestamp: new Date().toISOString(),
      source: "frontend-api"
    };

    // Send message to queue
    const sent = channel.sendToQueue(
      "order_created",
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,
        headers: { 'x-retries': 0 }
      }
    );

    if (!sent) {
      return NextResponse.json(
        { success: false, error: "Order queue full" },
        { status: 503 }
      );
    }

    return NextResponse.json({ 
      success: true,
      messageId: message.timestamp 
    });

  } catch (error) {
    console.error("Order processing failed:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Order processing failed",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
// app/api/orders/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    
    // Call product-service endpoint
    const response = await fetch('http://localhost:3001/products/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Product service error: ${response.statusText}`);
    }

    return NextResponse.json(
      { success: true, message: "Order processed" },
      { status: 200 }
    );

  } catch (error: unknown) {
    // Keep existing error handling
  }
}
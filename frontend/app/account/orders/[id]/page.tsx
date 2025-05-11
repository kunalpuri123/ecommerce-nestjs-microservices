"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/auth-context"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const orderId = params.id

  // Get orders from localStorage
  const orders = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("orders") || "[]") : []

  const order = orders.find((o: any) => o.id === orderId)

  if (!user) {
    router.push("/login?redirect=account/orders")
    return null
  }

  if (!order) {
    return (
      <div className="container py-8 md:py-12">
        <Button variant="ghost" className="mb-6" onClick={() => router.push("/account/orders")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>

        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/account/orders")}>View All Orders</Button>
        </div>
      </div>
    )
  }

  // Generate random order items for demo
  const orderItems = Array.from({ length: order.items }, (_, i) => ({
    id: `item_${i + 1}`,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    quantity: Math.floor(Math.random() * 3) + 1,
    image: "/placeholder.svg?height=80&width=80",
  }))

  // Calculate order summary
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/account/orders")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold">Order #{order.id}</h1>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2 md:mt-0">
              {order.status}
            </div>
          </div>

          <p className="text-muted-foreground">
            Placed on {new Date(order.date).toLocaleDateString()} • {order.items} item(s)
          </p>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Order Items</h2>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 py-2 border-b last:border-0">
                    <div className="w-20 h-20 bg-muted rounded flex items-center justify-center">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Shipping Information</h2>
              <div className="space-y-2">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">123 Main Street</p>
                <p className="text-muted-foreground">Apt 4B</p>
                <p className="text-muted-foreground">New York, NY 10001</p>
                <p className="text-muted-foreground">United States</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <p className="text-sm text-muted-foreground">Credit Card ending in 1234</p>
                </div>

                <Button className="w-full" onClick={() => router.push("/products")}>
                  Buy Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

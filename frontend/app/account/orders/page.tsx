"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, Package, ShoppingBag, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Get orders from localStorage
  const orders = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("orders") || "[]") : []

  if (!user) {
    router.push("/login?redirect=account/orders")
    return null
  }

  if (orders.length === 0) {
    return (
      <div className="container py-8 md:py-12">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="border rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to place your first order.
          </p>
          <Button onClick={() => router.push("/products")}>
            Browse Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div className="bg-muted p-4 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col md:items-end">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {order.status}
                </div>
                <p className="font-medium mt-1">${order.total.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {getOrderStatusIcon(order.status)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{getOrderStatusText(order.status)}</p>
                  <p className="text-sm text-muted-foreground">{getOrderStatusDescription(order.status)}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
                <Button onClick={() => router.push(`/account/orders/${order.id}`)}>View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getOrderStatusIcon(status: string) {
  switch (status) {
    case "Processing":
      return <Package className="h-5 w-5 text-primary" />
    case "Shipped":
      return <Truck className="h-5 w-5 text-primary" />
    case "Delivered":
      return <ShoppingBag className="h-5 w-5 text-primary" />
    default:
      return <Package className="h-5 w-5 text-primary" />
  }
}

function getOrderStatusText(status: string) {
  switch (status) {
    case "Processing":
      return "Order is being processed"
    case "Shipped":
      return "Order has been shipped"
    case "Delivered":
      return "Order has been delivered"
    default:
      return "Order is being processed"
  }
}

function getOrderStatusDescription(status: string) {
  switch (status) {
    case "Processing":
      return "Your order is being prepared for shipping"
    case "Shipped":
      return "Your order is on its way to you"
    case "Delivered":
      return "Your order has been delivered"
    default:
      return "Your order is being prepared for shipping"
  }
}

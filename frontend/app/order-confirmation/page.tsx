"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Prevent going back to checkout or cart after order is placed
  useEffect(() => {
    // Replace current history entry with order confirmation
    window.history.replaceState(null, "", window.location.href)

    // Add event listener to prevent navigation
    const handlePopState = (e: PopStateEvent) => {
      // Push the confirmation page back into history
      window.history.pushState(null, "", window.location.href)
      e.preventDefault()
    }

    window.addEventListener("popstate", handlePopState)

    // Save order to local storage for account page
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Processing",
      total: Math.floor(Math.random() * 300) + 50, // Random total for demo
      items: Math.floor(Math.random() * 5) + 1, // Random number of items for demo
    }
    localStorage.setItem("orders", JSON.stringify([...savedOrders, newOrder]))

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [orderId])

  return (
    <div className="container flex flex-col items-center justify-center py-12 md:py-24">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-bold">{orderId}</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{orderDate}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-medium">{estimatedDelivery}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <p>A confirmation email has been sent to your email address.</p>
          </div>

          <div className="pt-4 space-y-4">
            <Button asChild className="w-full">
              <Link href="/account/orders">View Order</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

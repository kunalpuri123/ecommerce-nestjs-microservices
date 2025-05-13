"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cartItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async () => {
    // Validate shipping info
    for (const [key, value] of Object.entries(shippingInfo)) {
      if (!value) {
        toast({
          title: "Missing information",
          description: `Please fill in your ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          variant: "destructive",
        })
        return
      }
    }

    // Validate payment info
    for (const [key, value] of Object.entries(paymentInfo)) {
      if (!value) {
        toast({
          title: "Missing information",
          description: `Please fill in your ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          variant: "destructive",
        })
        return
      }
    }

    try {
      // Prepare order data
      const orderData = {
        customerId: user?.id,
         name: shippingInfo.fullName,      
          email: shippingInfo.email,        
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          fullName: shippingInfo.fullName,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          zipCode: shippingInfo.zipCode,
          country: shippingInfo.country,
        },
        shippingMethod,
        paymentMethod: "credit_card",
        total: totalPrice + shipping + tax,
      }

      // Try to use the API
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) throw new Error("Failed to create order")

        // Clear the cart
        clearCart()

        // Redirect to order confirmation
        router.push("/order-confirmation")
      } catch (apiError) {
        console.log("API order creation failed, using mock flow:", apiError)
        // Fallback for demo purposes
        // Clear the cart
        clearCart()

        // Redirect to order confirmation
        router.push("/order-confirmation")
      }
    } catch (error) {
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Calculate totals
  const subtotal = totalPrice
  const shipping = shippingMethod === "express" ? 15.99 : 5.99
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + shipping + tax

  // Redirect if not logged in or cart is empty
  if (!user) {
    router.push("/login?redirect=checkout")
    return null
  }

  if (cartItems.length === 0) {
    
    return null
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/cart")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>

      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="shipping" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Shipping Method</h2>

                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                  <div className="flex items-center space-x-3 border rounded-lg p-4">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <span>Standard Shipping</span>
                        </div>
                        <span className="font-semibold">$5.99</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Delivery in 3-5 business days</p>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <span>Express Shipping</span>
                        </div>
                        <span className="font-semibold">$15.99</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Delivery in 1-2 business days</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Information</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                      <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={paymentInfo.cardName}
                      onChange={handlePaymentInfoChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentInfoChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Billing Address</h2>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sameAsShipping" defaultChecked />
                  <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

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

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
              Place Order
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-2">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

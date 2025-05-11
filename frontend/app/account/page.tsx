"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Camera, Pencil, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

export default function AccountPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, logout } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileInfo, setProfileInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [profileImage, setProfileImage] = useState<string>("/placeholder-user.jpg")
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    router.push("/login?redirect=account")
    return null
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)

    // In a real app, this would update the user profile via API
    // For demo purposes, we'll just show a success message
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully",
    })

    // Update user in localStorage
    const updatedUser = {
      ...user,
      name: profileInfo.name,
      email: profileInfo.email,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would update the password via API
    // For demo purposes, we'll just show a success message
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully",
    })

    setPasswordInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleProfileImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
          toast({
            title: "Profile picture updated",
            description: "Your profile picture has been updated successfully",
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background">
                <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                <div
                  className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleProfileImageClick}
                >
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Profile Information</h2>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileInfo.name}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileInfo.email}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={profileInfo.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        placeholder="(123) 456-7890"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileInfo.address}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button type="submit">Save Changes</Button>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Change Password</h2>

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordInfo.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordInfo.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordInfo.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <Button type="submit">Update Password</Button>
                </form>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-xl font-semibold">Account Actions</h2>

                <Button variant="destructive" onClick={logout}>
                  Logout
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6 pt-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Order History</h2>

                <OrderHistory />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function OrderHistory() {
  const router = useRouter()

  // Get orders from localStorage
  const orders = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("orders") || "[]") : []

  if (orders.length === 0) {
    return (
      <div className="border rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <User className="h-12 w-12 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        <Button className="mt-4" onClick={() => router.push("/products")}>
          Start Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order: any) => (
        <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {order.status}
              </div>
              <p className="font-medium mt-1">${order.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
            <Button variant="outline" size="sm" onClick={() => router.push(`/account/orders/${order.id}`)}>
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

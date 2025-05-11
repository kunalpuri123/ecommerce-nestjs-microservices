"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  token?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app with microservices, this would call the API
      // For demo purposes, we'll use the API service but fallback to mock data
      try {
        // Try to use the API first
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "login", email, password }),
        })

        if (!response.ok) throw new Error("API call failed")

        const data = await response.json()

        // Save to localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id || data.customerId,
            name: data.name || email.split("@")[0],
            email,
            token: data.token || "mock-token",
          }),
        )

        setUser({
          id: data.id || data.customerId,
          name: data.name || email.split("@")[0],
          email,
        })

        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        router.push("/")
      } catch (apiError) {
        console.log("API login failed, using mock data:", apiError)
        // Fallback to mock data for demo
        if (email && password) {
          // Mock user data
          const userData = {
            id: "user_" + Math.random().toString(36).substr(2, 9),
            name: email.split("@")[0],
            email,
          }

          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(userData))
          setUser(userData)

          toast({
            title: "Login successful",
            description: "Welcome back!",
          })

          router.push("/")
        } else {
          throw new Error("Invalid credentials")
        }
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app with microservices, this would call the API
      // For demo purposes, we'll use the API service but fallback to mock data
      try {
        // Try to use the API first
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "register",
            name,
            email,
            password,
          }),
        })

        if (!response.ok) throw new Error("API call failed")

        const data = await response.json()

        // Save to localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id || data.customerId,
            name,
            email,
            token: data.token || "mock-token",
          }),
        )

        setUser({
          id: data.id || data.customerId,
          name,
          email,
        })

        toast({
          title: "Registration successful",
          description: "Your account has been created",
        })

        router.push("/")
      } catch (apiError) {
        console.log("API registration failed, using mock data:", apiError)
        // Fallback to mock data for demo
        if (name && email && password) {
          // Mock user data
          const userData = {
            id: "user_" + Math.random().toString(36).substr(2, 9),
            name,
            email,
          }

          // Save to localStorage
          localStorage.setItem("user", JSON.stringify(userData))
          setUser(userData)

          toast({
            title: "Registration successful",
            description: "Your account has been created",
          })

          router.push("/")
        } else {
          throw new Error("Please fill all required fields")
        }
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

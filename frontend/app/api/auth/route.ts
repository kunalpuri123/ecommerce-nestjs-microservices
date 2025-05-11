import { NextResponse } from "next/server"
import { customerApi } from "@/services/api"

export async function POST(request: Request) {
  try {
    const { action, ...data } = await request.json()

    if (action === "register") {
      const customer = await customerApi.register(data)
      return NextResponse.json(customer)
    } else if (action === "login") {
      const { email, password } = data

      if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
      }

      const result = await customerApi.login({ email, password })
      return NextResponse.json(result)
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

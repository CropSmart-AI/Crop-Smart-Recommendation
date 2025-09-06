import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simulate authentication logic
    // In a real app, this would validate against a database
    if (email && password) {
      // Mock successful login
      const mockUser = {
        id: "1",
        name: "Farmer User",
        email: email,
        location: "Maharashtra, India",
        joinedDate: "2024-01-01",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      return NextResponse.json({
        token: mockToken,
        user: mockUser,
        message: "Login successful",
      })
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  } catch (error) {
    console.error("Error in login:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

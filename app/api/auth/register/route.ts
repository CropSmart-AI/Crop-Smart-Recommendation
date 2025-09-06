import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, location } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Simulate user registration
    // In a real app, this would save to a database
    const mockUser = {
      id: "new-user-" + Date.now(),
      name: name,
      email: email,
      location: location || "India",
      joinedDate: new Date().toISOString().split("T")[0],
    }

    const mockToken = "mock-jwt-token-" + Date.now()

    return NextResponse.json(
      {
        token: mockToken,
        user: mockUser,
        message: "Registration successful",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in registration:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

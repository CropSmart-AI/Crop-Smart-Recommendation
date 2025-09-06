import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Simulate password reset email sending
    // In a real app, this would send an actual email
    console.log(`Password reset email would be sent to: ${email}`)

    return NextResponse.json({
      message: "Password reset instructions have been sent to your email address",
      email: email,
    })
  } catch (error) {
    console.error("Error in password reset:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

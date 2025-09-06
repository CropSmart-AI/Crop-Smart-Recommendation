import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supportedCrops = [
      "Wheat",
      "Rice",
      "Cotton",
      "Sugarcane",
      "Maize",
      "Soybean",
      "Mustard",
      "Gram",
      "Barley",
      "Ragi",
      "Groundnut",
      "Sunflower",
      "Coconut",
      "Mango",
      "Cashew",
      "Spices",
      "Millets",
      "Pulses",
      "Jowar",
      "Bajra",
      "Tur",
      "Moong",
      "Urad",
      "Chana",
      "Masoor",
    ]

    return NextResponse.json({
      crops: supportedCrops,
      count: supportedCrops.length,
    })
  } catch (error) {
    console.error("Error fetching supported crops:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

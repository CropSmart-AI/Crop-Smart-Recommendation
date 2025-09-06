import { NextResponse } from "next/server"

export async function GET() {
  try {
    const agroZones = [
      {
        id: 1,
        name: "Arid",
        description: "Low rainfall, high temperature regions",
        states: ["Rajasthan", "Gujarat", "Haryana"],
        suitableCrops: ["Wheat", "Mustard", "Barley", "Gram"],
      },
      {
        id: 2,
        name: "Semi-Arid",
        description: "Moderate rainfall, variable temperature",
        states: ["Maharashtra", "Karnataka", "Andhra Pradesh"],
        suitableCrops: ["Cotton", "Soybean", "Ragi", "Groundnut"],
      },
      {
        id: 3,
        name: "Tropical",
        description: "High rainfall, high temperature and humidity",
        states: ["Kerala", "Tamil Nadu", "Karnataka"],
        suitableCrops: ["Rice", "Coconut", "Spices", "Rubber"],
      },
      {
        id: 4,
        name: "Coastal",
        description: "High humidity, moderate temperature, sea influence",
        states: ["Goa", "Kerala", "West Bengal"],
        suitableCrops: ["Rice", "Coconut", "Cashew", "Fish farming"],
      },
      {
        id: 5,
        name: "Subtropical",
        description: "Moderate rainfall and temperature",
        states: ["Punjab", "Uttar Pradesh", "Bihar"],
        suitableCrops: ["Wheat", "Rice", "Sugarcane", "Maize"],
      },
    ]

    return NextResponse.json({
      zones: agroZones,
      count: agroZones.length,
    })
  } catch (error) {
    console.error("Error fetching agro zones:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Return mock model information
    // In a real app, this would fetch actual model metadata
    const modelInfo = {
      name: "CropSmart AI",
      version: "1.1.1",
      accuracy: 0.847,
      lastUpdated: "September 2025",
      trainingData: "Indian Agricultural Dataset 2025",
      supportedCrops: 25,
      agroZonesCovered: 15,
    }

    return NextResponse.json(modelInfo)
  } catch (error) {
    console.error("Error fetching model info:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

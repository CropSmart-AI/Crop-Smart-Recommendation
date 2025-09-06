import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude } = await request.json()

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
    }

    // Simulate AI recommendation logic based on coordinates
    // In a real app, this would call your ML model with geographic data
    const lat = Number.parseFloat(latitude)
    const lon = Number.parseFloat(longitude)

    let recommendation = {
      crop: "Wheat",
      confidence: 0.75,
      agroZone: "Mixed",
      topSuggestions: ["Rice", "Maize", "Pulses"],
      reason: "General recommendation based on geographic coordinates.",
    }

    // Simple logic based on latitude ranges (India-specific)
    if (lat >= 28 && lat <= 35) {
      // Northern India
      recommendation = {
        crop: "Wheat",
        confidence: 0.82,
        agroZone: "Arid to Semi-Arid",
        topSuggestions: ["Rice", "Mustard", "Sugarcane"],
        reason: "Northern plains with fertile alluvial soil, ideal for wheat cultivation.",
      }
    } else if (lat >= 20 && lat < 28) {
      // Central India
      recommendation = {
        crop: "Cotton",
        confidence: 0.79,
        agroZone: "Semi-Arid",
        topSuggestions: ["Soybean", "Wheat", "Gram"],
        reason: "Black cotton soil and moderate rainfall perfect for cotton farming.",
      }
    } else if (lat >= 8 && lat < 20) {
      // Southern India
      recommendation = {
        crop: "Rice",
        confidence: 0.86,
        agroZone: "Tropical",
        topSuggestions: ["Coconut", "Spices", "Millets"],
        reason: "Tropical climate with monsoon rains ideal for paddy cultivation.",
      }
    }

    // Coastal areas (longitude-based adjustment)
    if ((lon >= 68 && lon <= 75) || (lon >= 80 && lon <= 88)) {
      recommendation.topSuggestions = ["Coconut", "Rice", "Cashew"]
      recommendation.agroZone = "Coastal"
    }

    // Add some randomness to confidence
    const confidence = Math.max(0.65, Math.min(0.95, recommendation.confidence + (Math.random() - 0.5) * 0.1))

    return NextResponse.json({
      ...recommendation,
      confidence,
      coordinates: { latitude: lat, longitude: lon },
    })
  } catch (error) {
    console.error("Error in recommend-by-coordinates:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

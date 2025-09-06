import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { village } = await request.json()

    if (!village) {
      return NextResponse.json({ error: "Village name is required" }, { status: 400 })
    }

    // Simulate AI recommendation logic
    // In a real app, this would call your ML model
    const recommendations = {
      pune: {
        crop: "Wheat",
        confidence: 0.87,
        agroZone: "Semi-Arid",
        topSuggestions: ["Rice", "Sugarcane", "Cotton"],
        reason: "Ideal climate and soil conditions for wheat cultivation in this region.",
      },
      mumbai: {
        crop: "Rice",
        confidence: 0.92,
        agroZone: "Coastal",
        topSuggestions: ["Coconut", "Mango", "Cashew"],
        reason: "High humidity and coastal climate perfect for rice production.",
      },
      delhi: {
        crop: "Mustard",
        confidence: 0.78,
        agroZone: "Arid",
        topSuggestions: ["Wheat", "Barley", "Gram"],
        reason: "Cool winters and moderate rainfall suitable for mustard crops.",
      },
      bangalore: {
        crop: "Ragi",
        confidence: 0.85,
        agroZone: "Semi-Arid",
        topSuggestions: ["Maize", "Groundnut", "Sunflower"],
        reason: "Moderate climate and well-drained soil ideal for finger millet.",
      },
      chennai: {
        crop: "Rice",
        confidence: 0.89,
        agroZone: "Coastal",
        topSuggestions: ["Sugarcane", "Cotton", "Groundnut"],
        reason: "Tropical climate with adequate water supply perfect for paddy cultivation.",
      },
    }

    const villageKey = village.toLowerCase().split(",")[0].trim()
    const recommendation = recommendations[villageKey as keyof typeof recommendations] || {
      crop: "Wheat",
      confidence: 0.75,
      agroZone: "Mixed",
      topSuggestions: ["Rice", "Maize", "Pulses"],
      reason: "General recommendation based on typical Indian farming conditions.",
    }

    // Add some randomness to make it feel more dynamic
    const confidence = Math.max(0.65, Math.min(0.95, recommendation.confidence + (Math.random() - 0.5) * 0.1))

    return NextResponse.json({
      ...recommendation,
      confidence,
      location: village,
    })
  } catch (error) {
    console.error("Error in recommend-by-village:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

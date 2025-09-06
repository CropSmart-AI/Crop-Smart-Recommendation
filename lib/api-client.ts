// Types and Interfaces
export interface CropRecommendation {
  crop: string
  confidence: number
  agroZone: string
  topSuggestions: string[]
  reason: string
  location?: string
  coordinates?: { latitude: number; longitude: number }
}

export interface ModelInfo {
  name: string
  version: string
  accuracy: number
  lastUpdated: string
  trainingData?: string
  supportedCrops?: number
  agroZonesCovered?: number
}

export interface AgroZone {
  id: number
  name: string
  description: string
  states: string[]
  suitableCrops: string[]
}

export interface SupportedCropsResponse {
  crops: string[]
  count: number
}

export interface AgroZonesResponse {
  zones: AgroZone[]
  count: number
}

// Remove the interface ApiError and keep only the class
export class ApiError extends Error {
  status?: number
  code?: string

  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
  }
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
    this.defaultHeaders = {
      "Content-Type": "application/json",
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    // Debug log to check if API URL is set
    console.log(`Making API request to: ${url}`)

    const config: RequestInit = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      cache: 'no-store', // ← DISABLE CACHING
      ...options,
    }

    // Log the request payload for debugging
    if (config.body) {
      console.log('Request payload:', config.body)
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`, 
          response.status
        )
      }

      const data = await response.json()
      console.log('Raw API Response:', data) // Debug log
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }

      // Network or other errors
      console.error('Network error:', error)
      throw new ApiError("Network error. Please check your connection and try again.", 0)
    }
  }

  // Crop Recommendation APIs
  async getRecommendationByVillage(village: string): Promise<CropRecommendation> {
    console.log(`🏘️ Requesting village recommendation for: ${village}`)
    
    const response = await this.request<any>("/api/recommend-by-village", {
      method: "POST",
      body: JSON.stringify({ village }),
      cache: 'no-store', // ← FORCE NO CACHE
    })

    console.log('Village API raw response:', response)

    // Transform backend response to match frontend interface
    const transformed = {
      crop: response.prediction?.primary_crop || "Unknown",
      confidence: response.prediction?.confidence || 0,
      agroZone: response.village_info?.agro_zone || "Unknown",
      topSuggestions: response.prediction?.recommendations?.map((r: any) => r.crop) || [],
      reason: `Based on ${response.village_info?.agro_zone} zone conditions`,
      location: response.village_info?.name,
      coordinates: response.village_info?.coordinates
    }

    console.log('Village API transformed response:', transformed)
    return transformed
  }

  async getRecommendationByCoordinates(latitude: number, longitude: number): Promise<CropRecommendation> {
    console.log(`📍 Requesting coordinates recommendation for: ${latitude}, ${longitude}`)
    
    const requestPayload = { lat: latitude, lon: longitude }
    console.log('Coordinates request payload:', requestPayload)
    
    const response = await this.request<any>("/api/recommend-by-coordinates", {
      method: "POST",
      body: JSON.stringify(requestPayload),
      cache: 'no-store', // ← FORCE NO CACHE
    })

    console.log('Coordinates API raw response:', response)

    // Transform backend response to match frontend interface
    const transformed = {
      crop: response.prediction?.primary_crop || "Unknown",
      confidence: response.prediction?.confidence || 0,
      agroZone: response.location_info?.agro_zone || "Unknown",
      topSuggestions: response.prediction?.recommendations?.map((r: any) => r.crop) || [],
      reason: `Based on ${response.location_info?.agro_zone} zone conditions`,
      coordinates: response.location_info?.coordinates
    }

    console.log('Coordinates API transformed response:', transformed)
    return transformed
  }

  // Information APIs
  async getModelInfo(): Promise<ModelInfo> {
    const response = await this.request<any>("/api/model-info", {
      cache: 'no-store'
    })
    
    return {
      name: response.model_info?.model_type || "CropSmart AI",
      version: response.model_info?.version || "2.0",
      accuracy: response.model_info?.accuracy || 0,
      lastUpdated: response.model_info?.training_date || "Unknown",
      supportedCrops: response.model_info?.crops_supported,
      agroZonesCovered: response.model_info?.agro_zones_supported
    }
  }

  async getSupportedCrops(): Promise<SupportedCropsResponse> {
    const response = await this.request<any>("/api/supported-crops", {
      cache: 'no-store'
    })
    
    return {
      crops: response.crops || [],
      count: response.total_crops || 0
    }
  }

  async getAgroZones(): Promise<AgroZonesResponse> {
    const response = await this.request<any>("/api/agro-zones", {
      cache: 'no-store'
    })
    
    // Transform the zones data
    const zones: AgroZone[] = response.zones?.map((zone: string, index: number) => ({
      id: index + 1,
      name: zone,
      description: response.zone_descriptions?.[zone] || `${zone} agro-climatic zone`,
      states: [], // You can add state mapping later
      suitableCrops: [] // You can add crop mapping later
    })) || []
    
    return {
      zones,
      count: response.total_zones || 0
    }
  }

  // Authentication APIs (for future implementation)
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    return this.request<{ token: string; user: any }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      cache: 'no-store'
    })
  }

  async register(userData: {
    name: string
    email: string
    password: string
    location?: string
  }): Promise<{ token: string; user: any }> {
    return this.request<{ token: string; user: any }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      cache: 'no-store'
    })
  }

  async resetPassword(email: string): Promise<{ message: string }> {
    return this.request<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      cache: 'no-store'
    })
  }
}

// Export singleton instance
export const apiClient = new ApiClient()

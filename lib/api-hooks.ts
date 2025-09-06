"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient, type CropRecommendation, ApiError } from "./api-client"

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>
  reset: () => void
}

// Generic hook for API calls
function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiCall()
      setState({ data, loading: false, error: null })
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "An unexpected error occurred"

      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
    }
  }, dependencies)

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    ...state,
    refetch: fetchData,
    reset,
  }
}

// Specific hooks for different API endpoints
export function useModelInfo() {
  return useApi(() => apiClient.getModelInfo())
}

export function useSupportedCrops() {
  return useApi(() => apiClient.getSupportedCrops())
}

export function useAgroZones() {
  return useApi(() => apiClient.getAgroZones())
}

// Hook for crop recommendations with manual trigger
export function useCropRecommendation() {
  const [state, setState] = useState<UseApiState<CropRecommendation>>({
    data: null,
    loading: false,
    error: null,
  })

  const getRecommendationByVillage = useCallback(async (village: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiClient.getRecommendationByVillage(village)
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "Failed to get recommendation"

      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }, [])

  const getRecommendationByCoordinates = useCallback(async (latitude: number, longitude: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiClient.getRecommendationByCoordinates(latitude, longitude)
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "Failed to get recommendation"

      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    getRecommendationByVillage,
    getRecommendationByCoordinates,
    reset,
  }
}

// Hook for authentication
export function useAuth() {
  const [state, setState] = useState<UseApiState<{ token: string; user: any }>>({
    data: null,
    loading: false,
    error: null,
  })

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiClient.login(email, password)
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "Login failed"

      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }, [])

  const register = useCallback(
    async (userData: {
      name: string
      email: string
      password: string
      location?: string
    }) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await apiClient.register(userData)
        setState({ data, loading: false, error: null })
        return data
      } catch (error) {
        const errorMessage = error instanceof ApiError ? error.message : "Registration failed"

        setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
        throw error
      }
    },
    [],
  )

  const resetPassword = useCallback(async (email: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await apiClient.resetPassword(email)
      setState((prev) => ({ ...prev, loading: false, error: null }))
      return data
    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : "Password reset failed"

      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }, [])

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    login,
    register,
    resetPassword,
    reset,
  }
}

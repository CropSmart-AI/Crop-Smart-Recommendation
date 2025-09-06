"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Leaf, MapPin, Search, Loader2, TrendingUp, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCropRecommendation, useModelInfo } from "@/lib/api-hooks"
import { MobileNav } from "@/components/mobile-nav"

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState("village")
  const [villageName, setVillageName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  const {
    data: recommendation,
    loading,
    error,
    getRecommendationByVillage,
    getRecommendationByCoordinates,
    reset,
  } = useCropRecommendation()

  const { data: modelInfo } = useModelInfo()

  const handleVillageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!villageName.trim()) return

    try {
      await getRecommendationByVillage(villageName)
    } catch (error) {
      // Error is already handled by the hook
      console.error("Failed to get village recommendation:", error)
    }
  }

  const handleCoordinatesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!latitude.trim() || !longitude.trim()) return

    try {
      await getRecommendationByCoordinates(Number.parseFloat(latitude), Number.parseFloat(longitude))
    } catch (error) {
      // Error is already handled by the hook
      console.error("Failed to get coordinates recommendation:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg md:text-xl font-bold text-foreground">CropSmart AI</span>
            </div>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4 text-balance">
            Get Crop Recommendations
          </h1>
          <p className="text-base md:text-lg text-muted-foreground text-pretty px-2">
            Enter your location to receive AI-powered crop suggestions tailored to your area
          </p>
        </div>

        {/* Recommendation Form */}
        <Card className="mb-6 md:mb-8">
          <CardHeader className="pb-4 md:pb-6">
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Search className="h-5 w-5 text-primary" />
              <span>Choose Your Location Method</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Select how you'd like to provide your location for personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4 md:mb-6 h-auto">
                <TabsTrigger
                  value="village"
                  className="text-sm md:text-base py-3 px-2 md:px-4 flex-col sm:flex-row gap-1 sm:gap-2 h-auto"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="text-center">By Village Name</span>
                </TabsTrigger>
                <TabsTrigger
                  value="coordinates"
                  className="text-sm md:text-base py-3 px-2 md:px-4 flex-col sm:flex-row gap-1 sm:gap-2 h-auto"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-center">By Coordinates</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="village">
                <form onSubmit={handleVillageSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="village" className="text-sm md:text-base font-medium">
                      Village Name
                    </Label>
                    <Input
                      id="village"
                      type="text"
                      placeholder="Enter your village name (e.g., Pune, Maharashtra)"
                      value={villageName}
                      onChange={(e) => setVillageName(e.target.value)}
                      className="mt-2 text-base py-3 h-12"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base py-4 h-12 md:h-auto md:py-3"
                    disabled={loading || !villageName.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Recommendation...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Get Crop Recommendation
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="coordinates">
                <form onSubmit={handleCoordinatesSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="latitude" className="text-sm md:text-base font-medium">
                        Latitude
                      </Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 18.5204"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="mt-2 text-base py-3 h-12"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude" className="text-sm md:text-base font-medium">
                        Longitude
                      </Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        placeholder="e.g., 73.8567"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="mt-2 text-base py-3 h-12"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-base py-4 h-12 md:h-auto md:py-3"
                    disabled={loading || !latitude.trim() || !longitude.trim()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Recommendation...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Get Crop Recommendation
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 md:mb-8 border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <p className="text-destructive text-center text-sm md:text-base">{error}</p>
              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={reset} size="sm" className="h-10 bg-transparent">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendation Results */}
        {recommendation && (
          <div className="space-y-4 md:space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Main Recommendation */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardHeader className="text-center pb-4 md:pb-6">
                <div className="mx-auto mb-3 md:mb-4 p-3 md:p-4 bg-primary/10 rounded-full w-fit">
                  <Leaf className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl text-primary text-balance">
                  You should grow {recommendation.crop}!
                </CardTitle>
                <CardDescription className="text-sm md:text-base px-2">{recommendation.reason}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-4">
                  <Badge variant="secondary" className="text-sm md:text-base px-3 md:px-4 py-2">
                    Confidence: {Math.round(recommendation.confidence * 100)}%
                  </Badge>
                  <Badge variant="outline" className="text-sm md:text-base px-3 md:px-4 py-2">
                    Agro-Zone: {recommendation.agroZone}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Top Suggestions */}
            <Card>
              <CardHeader className="pb-4 md:pb-6">
                <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  <span>Top 3 Alternative Crops</span>
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Other suitable crops for your location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {recommendation.topSuggestions.map((crop, index) => (
                    <div
                      key={index}
                      className="p-4 bg-muted/50 rounded-lg text-center border border-border hover:border-secondary/50 transition-colors"
                    >
                      <div className="text-2xl mb-2">🌾</div>
                      <h3 className="font-semibold text-foreground text-sm md:text-base">{crop}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">Alternative #{index + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Model Information */}
            {modelInfo && (
              <>
                <Separator />
                <Card>
                  <CardHeader className="pb-4 md:pb-6">
                    <CardTitle className="flex items-center space-x-2 text-base md:text-lg">
                      <Info className="h-5 w-5 text-muted-foreground" />
                      <span>Model Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm">
                      <div>
                        <p className="text-muted-foreground">Model</p>
                        <p className="font-medium">{modelInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Version</p>
                        <p className="font-medium">{modelInfo.version}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Accuracy</p>
                        <p className="font-medium">{Math.round(modelInfo.accuracy * 100)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Updated</p>
                        <p className="font-medium">{modelInfo.lastUpdated}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-6 md:mt-8 bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4 text-sm md:text-base px-2">
                Having trouble with recommendations? Contact our support team.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="h-10 md:h-auto bg-transparent">
                  Contact Support
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

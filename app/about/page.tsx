import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Leaf, ArrowLeft, Brain, MapPin, Users, Target, Zap, Globe, Award, Heart, Code, Database } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">CropSmart AI</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About CropSmart AI</h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Empowering farmers across India with intelligent crop recommendations powered by artificial intelligence
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Target className="h-6 w-6 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              CropSmart AI was created to bridge the gap between traditional farming knowledge and modern technology. We
              believe that every farmer, regardless of their location or resources, deserves access to intelligent
              agricultural insights that can help maximize their harvest and improve their livelihood.
            </p>
          </CardContent>
        </Card>

        {/* How It Helps Section */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            How CropSmart AI Helps Farmers
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 hover:border-secondary/50 transition-colors">
              <CardHeader>
                <div className="p-3 bg-secondary/10 rounded-full w-fit mb-2">
                  <Brain className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Intelligent Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Our AI analyzes multiple factors including climate, soil conditions, and regional patterns to suggest
                  the most suitable crops for your specific location and season.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-full w-fit mb-2">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Location-Based Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Whether you provide your village name or GPS coordinates, we deliver personalized recommendations
                  based on your exact location and local agro-climatic conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Farmer-Friendly Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Simple interface with large buttons, clear instructions, and bilingual support makes it easy for
                  farmers of all technical backgrounds to access valuable insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-chart-5/50 transition-colors">
              <CardHeader>
                <div className="p-3 bg-chart-5/10 rounded-full w-fit mb-2">
                  <Award className="h-6 w-6 text-chart-5" />
                </div>
                <CardTitle className="text-xl">Confidence Scoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Each recommendation comes with a confidence score, helping farmers make informed decisions about their
                  crop selection with transparency and trust.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Zap className="h-6 w-6 text-primary" />
              <span>Technology Behind CropSmart AI</span>
            </CardTitle>
            <CardDescription>Advanced machine learning meets agricultural expertise</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Machine Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI algorithms trained on extensive agricultural datasets
                </p>
              </div>

              <div className="text-center">
                <div className="p-3 bg-secondary/10 rounded-full w-fit mx-auto mb-3">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Indian Agro-Zones</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive coverage of India's diverse agricultural zones
                </p>
              </div>

              <div className="text-center">
                <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-3">
                  <Database className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Real-Time Data</h3>
                <p className="text-sm text-muted-foreground">
                  Up-to-date climate and agricultural data for accurate predictions
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Key Features:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-fit">
                    ML
                  </Badge>
                  <span className="text-sm">Machine Learning Model v2.1</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-fit">
                    Data
                  </Badge>
                  <span className="text-sm">25+ Supported Crop Types</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-fit">
                    Zones
                  </Badge>
                  <span className="text-sm">15 Agro-Climatic Zones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-fit">
                    Accuracy
                  </Badge>
                  <span className="text-sm">84.7% Prediction Accuracy</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Heart className="h-6 w-6 text-primary" />
              <span>Our Team</span>
            </CardTitle>
            <CardDescription>Passionate individuals working to revolutionize agriculture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Development Team</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Full-stack developers and AI engineers building the platform
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">Agricultural Experts</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Agronomists and farming specialists providing domain expertise
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">Data Scientists</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  ML researchers training and optimizing recommendation models
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Special thanks to the farming communities across India who provided valuable feedback and insights
                during the development of CropSmart AI.
              </p>
              <Badge variant="outline" className="text-sm">
                Built with ❤️ for Indian Farmers
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="pt-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 text-pretty">
              Join thousands of farmers who are already using CropSmart AI to make better farming decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recommendations">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Crop Recommendations
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

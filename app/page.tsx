"use client"

import { Leaf, Users, Target, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/context"
import { LanguageToggle } from "@/components/language-toggle"
import { MobileNav } from "@/components/mobile-nav"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">CropSmart AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                {t.nav.home}
              </Link>
              <Link
                href="/recommendations"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t.nav.recommendations}
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                {t.nav.about}
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                {t.nav.contact}
              </Link>
              <Link href="/login" className="text-foreground hover:text-primary transition-colors font-medium">
                {t.nav.login}
              </Link>
              <LanguageToggle />
            </div>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-pretty px-4">{t.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
                <Link href="/recommendations">{t.hero.getStarted}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto bg-transparent"
              >
                <Link href="/about">{t.hero.learnMore}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">{t.features.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">{t.features.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <Target className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-3">{t.features.smart.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t.features.smart.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-3">{t.features.easy.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t.features.easy.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-semibold mb-3">{t.features.reliable.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t.features.reliable.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">{t.cta.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 px-4">{t.cta.subtitle}</p>
            <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 h-auto">
              <Link href="/recommendations">{t.cta.button}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">CropSmart AI</span>
          </div>
          <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}

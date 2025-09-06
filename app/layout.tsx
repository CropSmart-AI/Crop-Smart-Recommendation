import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n/context"
import "./globals.css"

export const metadata: Metadata = {
  title: "CropSmart AI - Intelligent Crop Recommendations for Farmers",
  description:
    "Get AI-powered crop recommendations based on your location and agro-zone. Perfect for farmers across India.",
  generator: "v0.app",
  keywords: "crop recommendations, farming, agriculture, AI, India, agro-zones",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

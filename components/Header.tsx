"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { UserProfile } from "./UserProfile"
import { useAuth } from "@/hooks/useAuth"

export function Header() {
  const { user, loading } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold">CropSmart AI</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-sm font-medium ml-8">
          <Link href="/recommendations" className="hover:text-primary">
            Recommendations
          </Link>
          <Link href="/weather" className="hover:text-primary">
            Weather
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </nav>

        {/* User Section */}
        <div className="ml-auto flex items-center space-x-4">
          {loading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
              </span>
              <UserProfile />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

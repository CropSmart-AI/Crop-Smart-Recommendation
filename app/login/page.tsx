"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Leaf, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Login } from "@/components/auth/Login"
import { SignUp } from "@/components/auth/SignUp"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back to CropSmart AI" : "Join CropSmart AI"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin 
              ? "Sign in to access your personalized crop recommendations"
              : "Create your account to get started with AI-powered farming insights"
            }
          </p>
        </div>

        {/* Auth Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {isLogin ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin 
                ? "Enter your credentials to access your account"
                : "Fill in your information to create a new account"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <Login onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignUp onSwitchToLogin={() => setIsLogin(true)} />
            )}
          </CardContent>
        </Card>

        {/* Features Info */}
        <Card className="mt-6 bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-sm text-foreground mb-2">
                What you get with CropSmart AI
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• AI-powered crop recommendations</li>
                <li>• Weather-based farming insights</li>
                <li>• Personalized agricultural guidance</li>
                <li>• Real-time market information</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

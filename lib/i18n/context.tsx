"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "./translations"

export type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: any // Changed from function to object to match component usage
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem("cropsmart-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("cropsmart-language", lang)
  }

  const createNestedTranslations = (flatTranslations: Record<string, string>) => {
    const nested: any = {}

    Object.entries(flatTranslations).forEach(([key, value]) => {
      const keys = key.split(".")
      let current = nested

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
    })

    return nested
  }

  const t = createNestedTranslations(translations[language] || translations.en)

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

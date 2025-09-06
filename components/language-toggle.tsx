"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="font-medium bg-transparent">
      {language === "en" ? "हिंदी" : "English"}
    </Button>
  )
}

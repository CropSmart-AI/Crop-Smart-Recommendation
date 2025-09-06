"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/lib/i18n/context"
import { LanguageToggle } from "@/components/language-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/recommendations", label: t.nav.recommendations },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/login", label: t.nav.login },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-10 w-10" aria-label="Open navigation menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center space-x-2 pb-6 border-b border-border">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">CropSmart AI</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 py-6 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 px-4 text-lg font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Language</span>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

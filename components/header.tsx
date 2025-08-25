"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Menu, X } from "lucide-react"
import { CartButton } from "@/components/cart-button"

interface HeaderProps {
  locale: "en" | "ar"
}

const translations = {
  en: {
    home: "Home",
    interior: "Interior Paint",
    exterior: "Exterior Paint",
    decorative: "Decorative",
    tools: "Tools & Supplies",
    about: "About",
    contact: "Contact",
    search: "Search products...",
    cart: "Cart",
    menu: "Menu",
  },
  ar: {
    home: "الرئيسية",
    interior: "دهان داخلي",
    exterior: "دهان خارجي",
    decorative: "دهانات زخرفية",
    tools: "أدوات ومستلزمات",
    about: "من نحن",
    contact: "اتصل بنا",
    search: "البحث عن المنتجات...",
    cart: "السلة",
    menu: "القائمة",
  },
}

export function Header({ locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const t = translations[locale]
  const isRTL = locale === "ar"

  const switchLanguage = (newLocale: "en" | "ar") => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const navigation = [
    { name: t.home, href: `/${locale}` },
    { name: t.interior, href: `/${locale}/interior` },
    { name: t.exterior, href: `/${locale}/exterior` },
    { name: t.decorative, href: `/${locale}/decorative` },
    { name: t.tools, href: `/${locale}/tools` },
    { name: t.about, href: `/${locale}/about` },
    { name: t.contact, href: `/${locale}/contact` },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <img
              src="/logooo.jpg"
              alt="PaintStore logo"
              className="w-20 h-10 md:w-12 md:h-12 rounded-md object-cover"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
            {/* Language Switcher */}
            <div className="flex items-center border rounded-md">
              <Button
                variant={locale === "en" ? "default" : "ghost"}
                size="sm"
                onClick={() => switchLanguage("en")}
                className="text-xs px-2 py-1"
              >
                EN
              </Button>
              <Button
                variant={locale === "ar" ? "default" : "ghost"}
                size="sm"
                onClick={() => switchLanguage("ar")}
                className="text-xs px-2 py-1"
              >
                AR
              </Button>
            </div>

            {/* Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <CartButton locale={locale} />

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

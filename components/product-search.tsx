"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface ProductSearchProps {
  locale: string
}

const translations = {
  en: {
    placeholder: "Search products, colors, or brands...",
    search: "Search",
    clear: "Clear",
  },
  ar: {
    placeholder: "البحث عن المنتجات أو الألوان أو العلامات التجارية...",
    search: "بحث",
    clear: "مسح",
  },
}

export function ProductSearch({ locale }: ProductSearchProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }
    router.push(`?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchTerm("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    router.push(`?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className={`flex ${isRTL ? "flex-row-reverse" : ""} gap-2`}>
      <div className="relative flex-1">
        <Search
          className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? "right-3" : "left-3"}`}
        />
        <Input
          type="text"
          placeholder={t.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${isRTL ? "pr-10 text-right" : "pl-10"}`}
          dir={isRTL ? "rtl" : "ltr"}
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? "left-1" : "right-1"} h-6 w-6 p-0`}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Button type="submit">{t.search}</Button>
    </form>
  )
}

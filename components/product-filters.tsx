"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface ProductFiltersProps {
  locale: string
  category?: string
}

const translations = {
  en: {
    filters: "Filters",
    clearAll: "Clear All",
    price: "Price Range",
    colors: "Colors",
    finish: "Finish Type",
    brand: "Brand",
    size: "Size",
    coverage: "Coverage",
    apply: "Apply Filters",
    from: "From",
    to: "To",
    matte: "Matte",
    satin: "Satin",
    semiGloss: "Semi-Gloss",
    gloss: "Gloss",
    eggshell: "Eggshell",
    flat: "Flat",
    quart: "Quart (1L)",
    gallon: "Gallon (4L)",
    fiveGallon: "5 Gallon (20L)",
    lowCoverage: "Low Coverage",
    mediumCoverage: "Medium Coverage",
    highCoverage: "High Coverage",
  },
  ar: {
    filters: "المرشحات",
    clearAll: "مسح الكل",
    price: "نطاق السعر",
    colors: "الألوان",
    finish: "نوع التشطيب",
    brand: "العلامة التجارية",
    size: "الحجم",
    coverage: "التغطية",
    apply: "تطبيق المرشحات",
    from: "من",
    to: "إلى",
    matte: "مطفي",
    satin: "ساتان",
    semiGloss: "نصف لامع",
    gloss: "لامع",
    eggshell: "قشر البيض",
    flat: "مسطح",
    quart: "كوارت (1 لتر)",
    gallon: "جالون (4 لتر)",
    fiveGallon: "5 جالون (20 لتر)",
    lowCoverage: "تغطية منخفضة",
    mediumCoverage: "تغطية متوسطة",
    highCoverage: "تغطية عالية",
  },
}

export function ProductFilters({ locale, category }: ProductFiltersProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"
  const router = useRouter()
  const searchParams = useSearchParams()

  const colors = [
    { name: "White", value: "white", color: "#ffffff" },
    { name: "Black", value: "black", color: "#000000" },
    { name: "Red", value: "red", color: "#dc2626" },
    { name: "Blue", value: "blue", color: "#2563eb" },
    { name: "Green", value: "green", color: "#16a34a" },
    { name: "Yellow", value: "yellow", color: "#eab308" },
    { name: "Purple", value: "purple", color: "#9333ea" },
    { name: "Orange", value: "orange", color: "#ea580c" },
  ]

  const finishTypes = [
    { name: t.matte, value: "matte" },
    { name: t.satin, value: "satin" },
    { name: t.semiGloss, value: "semi-gloss" },
    { name: t.gloss, value: "gloss" },
    { name: t.eggshell, value: "eggshell" },
    { name: t.flat, value: "flat" },
  ]

  const brands = [
    { name: "PaintPro", value: "paintpro" },
    { name: "ColorMaster", value: "colormaster" },
    { name: "Premium Plus", value: "premium-plus" },
    { name: "EcoFriendly", value: "eco-friendly" },
  ]

  const sizes = [
    { name: t.quart, value: "quart" },
    { name: t.gallon, value: "gallon" },
    { name: t.fiveGallon, value: "five-gallon" },
  ]

  const updateFilter = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.get(key)?.split(",") || []

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value)
      }
    } else {
      const index = currentValues.indexOf(value)
      if (index > -1) {
        currentValues.splice(index, 1)
      }
    }

    if (currentValues.length > 0) {
      params.set(key, currentValues.join(","))
    } else {
      params.delete(key)
    }

    router.push(`?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push(window.location.pathname)
  }

  const getActiveFilters = () => {
    const filters = []
    const params = new URLSearchParams(searchParams.toString())

    for (const [key, value] of params.entries()) {
      if (key !== "search") {
        const values = value.split(",")
        values.forEach((v) => filters.push({ key, value: v }))
      }
    }

    return filters
  }

  const activeFilters = getActiveFilters()

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
        <h3 className="text-lg font-semibold">{t.filters}</h3>
        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            {t.clearAll}
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : ""}`}>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {filter.value}
                <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilter(filter.key, filter.value, false)} />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.price}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider defaultValue={[0, 200]} max={200} step={5} className="w-full" />
            <div
              className={`flex items-center justify-between text-sm text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>$0</span>
              <span>$200+</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.colors}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => {
              const isSelected = searchParams.get("color")?.split(",").includes(color.value) || false
              return (
                <div
                  key={color.value}
                  className={`w-12 h-12 rounded-full border-2 cursor-pointer transition-all ${
                    isSelected ? "border-primary scale-110" : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color.color }}
                  onClick={() => updateFilter("color", color.value, !isSelected)}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Finish Type - Only for paint categories */}
      {category !== "tools" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.finish}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {finishTypes.map((finish) => {
                const isSelected = searchParams.get("finish")?.split(",").includes(finish.value) || false
                return (
                  <div
                    key={finish.value}
                    className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}
                  >
                    <Checkbox
                      id={finish.value}
                      checked={isSelected}
                      onCheckedChange={(checked) => updateFilter("finish", finish.value, checked as boolean)}
                    />
                    <label htmlFor={finish.value} className="text-sm cursor-pointer">
                      {finish.name}
                    </label>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Brand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.brand}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => {
              const isSelected = searchParams.get("brand")?.split(",").includes(brand.value) || false
              return (
                <div
                  key={brand.value}
                  className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}
                >
                  <Checkbox
                    id={brand.value}
                    checked={isSelected}
                    onCheckedChange={(checked) => updateFilter("brand", brand.value, checked as boolean)}
                  />
                  <label htmlFor={brand.value} className="text-sm cursor-pointer">
                    {brand.name}
                  </label>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Size - Only for paint categories */}
      {category !== "tools" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t.size}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sizes.map((size) => {
                const isSelected = searchParams.get("size")?.split(",").includes(size.value) || false
                return (
                  <div
                    key={size.value}
                    className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}
                  >
                    <Checkbox
                      id={size.value}
                      checked={isSelected}
                      onCheckedChange={(checked) => updateFilter("size", size.value, checked as boolean)}
                    />
                    <label htmlFor={size.value} className="text-sm cursor-pointer">
                      {size.name}
                    </label>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

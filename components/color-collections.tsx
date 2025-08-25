"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Eye } from "lucide-react"
import Link from "next/link"

interface ColorCollectionsProps {
  locale: string
}

const translations = {
  en: {
    title: "Color Collections",
    subtitle: "Curated palettes to inspire your next project",
    viewCollection: "View Collection",
    exploreAll: "Explore All Collections",
    colors: "colors",
    trending: "Trending",
    new: "New",
    classic: "Classic",
    seasonal: "Seasonal",
  },
  ar: {
    title: "مجموعات الألوان",
    subtitle: "لوحات ألوان منسقة لإلهام مشروعك القادم",
    viewCollection: "عرض المجموعة",
    exploreAll: "استكشف جميع المجموعات",
    colors: "لون",
    trending: "رائج",
    new: "جديد",
    classic: "كلاسيكي",
    seasonal: "موسمي",
  },
}

export function ColorCollections({ locale }: ColorCollectionsProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"
  const [selectedCollection, setSelectedCollection] = useState(0)

  const collections = [
    {
      id: 1,
      name: locale === "ar" ? "انسجام الطبيعة" : "Nature's Harmony",
      description: locale === "ar" ? "ألوان ترابية مستوحاة من الطبيعة" : "Earthy tones inspired by natural landscapes",
      badge: t.trending,
      colors: ["#8B7355", "#A0956C", "#6B8E23", "#8FBC8F", "#DEB887"],
      image: "/natural-living-room-with-earthy-paint-colors.png",
      colorCount: 5,
    },
    {
      id: 2,
      name: locale === "ar" ? "الهدوء الحديث" : "Modern Serenity",
      description: locale === "ar" ? "ألوان هادئة للمساحات المعاصرة" : "Calming colors for contemporary spaces",
      badge: t.new,
      colors: ["#F5F5F5", "#E8E8E8", "#D3D3D3", "#B0C4DE", "#778899"],
      image: "/modern-minimalist-room-with-calm-neutral-colors.png",
      colorCount: 5,
    },
    {
      id: 3,
      name: locale === "ar" ? "دفء الخريف" : "Autumn Warmth",
      description: locale === "ar" ? "ألوان دافئة تذكرنا بالخريف" : "Warm hues reminiscent of fall seasons",
      badge: t.seasonal,
      colors: ["#CD853F", "#D2691E", "#B22222", "#A0522D", "#8B4513"],
      image: "/cozy-autumn-themed-room-with-warm-paint-colors.png",
      colorCount: 5,
    },
    {
      id: 4,
      name: locale === "ar" ? "الأناقة الكلاسيكية" : "Classic Elegance",
      description: locale === "ar" ? "ألوان خالدة للديكور الراقي" : "Timeless colors for sophisticated decor",
      badge: t.classic,
      colors: ["#2F4F4F", "#708090", "#B0C4DE", "#F5F5DC", "#FFFAF0"],
      image: "/elegant-classic-interior-with-sophisticated-paint-.png",
      colorCount: 5,
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.subtitle}</p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${locale}/colors`}>{t.exploreAll}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Collection List */}
          <div className="space-y-4">
            {collections.map((collection, index) => (
              <Card
                key={collection.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedCollection === index ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedCollection(index)}
              >
                <CardContent className="p-6">
                  <div className={`flex items-start justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                    <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                      <div
                        className={`flex items-center ${isRTL ? "space-x-reverse space-x-3 justify-end" : "space-x-3"} mb-2`}
                      >
                        <h3 className="font-semibold text-lg">{collection.name}</h3>
                        <Badge variant="secondary">{collection.badge}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">{collection.description}</p>
                      <div
                        className={`flex items-center ${isRTL ? "space-x-reverse space-x-2 justify-end" : "space-x-2"} mb-4`}
                      >
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {collection.colorCount} {t.colors}
                        </span>
                      </div>
                      {/* Color Swatches */}
                      <div className={`flex ${isRTL ? "space-x-reverse space-x-2 justify-end" : "space-x-2"}`}>
                        {collection.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Collection Preview */}
          <div className="lg:sticky lg:top-8">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                <img
                  src={collections[selectedCollection].image || "/placeholder.svg"}
                  alt={collections[selectedCollection].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4">
                    <h4 className="font-semibold text-lg mb-2">{collections[selectedCollection].name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{collections[selectedCollection].description}</p>
                    <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={`flex ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                        {collections[selectedCollection].colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <Button asChild size="sm" className="group">
                        <Link href={`/${locale}/colors`}>
                          <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                          {t.viewCollection}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

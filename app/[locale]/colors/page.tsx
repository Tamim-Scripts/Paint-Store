"use client"

import { useState } from "react"
import { Palette, Download, Share2, Heart, Eye, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"
import { products } from "@/lib/products"

interface ColorsPageProps {
  params: { locale: string }
}

export default function ColorsPage({ params }: ColorsPageProps) {
  const { locale } = params
  const isRTL = locale === "ar"
  const { dispatch } = useCart()
  const [selectedCollection, setSelectedCollection] = useState(0)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const t = {
    title: locale === "ar" ? "مجموعات الألوان" : "Color Collections",
    subtitle:
      locale === "ar" ? "اكتشف لوحات الألوان المثالية لمشروعك" : "Discover the perfect color palettes for your project",
    collections: locale === "ar" ? "المجموعات" : "Collections",
    inspiration: locale === "ar" ? "الإلهام" : "Inspiration",
    visualizer: locale === "ar" ? "المصور" : "Visualizer",
    viewRoom: locale === "ar" ? "عرض الغرفة" : "View Room",
    downloadPalette: locale === "ar" ? "تحميل اللوحة" : "Download Palette",
    sharePalette: locale === "ar" ? "مشاركة اللوحة" : "Share Palette",
    addToFavorites: locale === "ar" ? "أضف للمفضلة" : "Add to Favorites",
    copyColor: locale === "ar" ? "نسخ اللون" : "Copy Color",
    copied: locale === "ar" ? "تم النسخ!" : "Copied!",
    colors: locale === "ar" ? "ألوان" : "colors",
    trending: locale === "ar" ? "رائج" : "Trending",
    new: locale === "ar" ? "جديد" : "New",
    classic: locale === "ar" ? "كلاسيكي" : "Classic",
    seasonal: locale === "ar" ? "موسمي" : "Seasonal",
    shopPaints: locale === "ar" ? "تسوق الدهانات" : "Shop Paints",
    matchingProducts: locale === "ar" ? "منتجات متطابقة" : "Matching Products",
  }

  const collections = [
    {
      id: 1,
      name: locale === "ar" ? "انسجام الطبيعة" : "Nature's Harmony",
      description: locale === "ar" ? "ألوان ترابية مستوحاة من الطبيعة" : "Earthy tones inspired by natural landscapes",
      badge: t.trending,
      colors: [
        { hex: "#8B7355", name: locale === "ar" ? "بني ترابي" : "Earthy Brown" },
        { hex: "#A0956C", name: locale === "ar" ? "أخضر زيتوني" : "Olive Green" },
        { hex: "#6B8E23", name: locale === "ar" ? "أخضر طبيعي" : "Natural Green" },
        { hex: "#8FBC8F", name: locale === "ar" ? "أخضر بحري" : "Sea Green" },
        { hex: "#DEB887", name: locale === "ar" ? "بيج رملي" : "Sandy Beige" },
      ],
      image: "/natural-living-room-with-earthy-paint-colors.png",
      rooms: [
        "/natural-living-room-with-earthy-paint-colors.png",
        "/modern-living-room-with-beautiful-paint-colors--in.png",
      ],
    },
    {
      id: 2,
      name: locale === "ar" ? "الهدوء الحديث" : "Modern Serenity",
      description: locale === "ar" ? "ألوان هادئة للمساحات المعاصرة" : "Calming colors for contemporary spaces",
      badge: t.new,
      colors: [
        { hex: "#F5F5F5", name: locale === "ar" ? "أبيض دخاني" : "Smoke White" },
        { hex: "#E8E8E8", name: locale === "ar" ? "رمادي فاتح" : "Light Gray" },
        { hex: "#D3D3D3", name: locale === "ar" ? "رمادي فضي" : "Silver Gray" },
        { hex: "#B0C4DE", name: locale === "ar" ? "أزرق فولاذي" : "Steel Blue" },
        { hex: "#778899", name: locale === "ar" ? "رمادي أردوازي" : "Slate Gray" },
      ],
      image: "/modern-minimalist-room-with-calm-neutral-colors.png",
      rooms: [
        "/modern-minimalist-room-with-calm-neutral-colors.png",
        "/modern-living-room-with-beautiful-paint-colors--in.png",
      ],
    },
    {
      id: 3,
      name: locale === "ar" ? "دفء الخريف" : "Autumn Warmth",
      description: locale === "ar" ? "ألوان دافئة تذكرنا بالخريف" : "Warm hues reminiscent of fall seasons",
      badge: t.seasonal,
      colors: [
        { hex: "#CD853F", name: locale === "ar" ? "ذهبي خريفي" : "Autumn Gold" },
        { hex: "#D2691E", name: locale === "ar" ? "برتقالي محروق" : "Burnt Orange" },
        { hex: "#B22222", name: locale === "ar" ? "أحمر ناري" : "Fire Red" },
        { hex: "#A0522D", name: locale === "ar" ? "بني سيينا" : "Sienna Brown" },
        { hex: "#8B4513", name: locale === "ar" ? "بني سرجي" : "Saddle Brown" },
      ],
      image: "/cozy-autumn-themed-room-with-warm-paint-colors.png",
      rooms: [
        "/cozy-autumn-themed-room-with-warm-paint-colors.png",
        "/modern-living-room-with-beautiful-paint-colors--in.png",
      ],
    },
    {
      id: 4,
      name: locale === "ar" ? "الأناقة الكلاسيكية" : "Classic Elegance",
      description: locale === "ar" ? "ألوان خالدة للديكور الراقي" : "Timeless colors for sophisticated decor",
      badge: t.classic,
      colors: [
        { hex: "#2F4F4F", name: locale === "ar" ? "رمادي أردوازي داكن" : "Dark Slate Gray" },
        { hex: "#708090", name: locale === "ar" ? "رمادي أردوازي" : "Slate Gray" },
        { hex: "#B0C4DE", name: locale === "ar" ? "أزرق فولاذي فاتح" : "Light Steel Blue" },
        { hex: "#F5F5DC", name: locale === "ar" ? "بيج عتيق" : "Antique Beige" },
        { hex: "#FFFAF0", name: locale === "ar" ? "أبيض زهري" : "Floral White" },
      ],
      image: "/elegant-classic-interior-with-sophisticated-paint-.png",
      rooms: [
        "/elegant-classic-interior-with-sophisticated-paint-.png",
        "/modern-living-room-with-beautiful-paint-colors--in.png",
      ],
    },
  ]

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const getMatchingProducts = (colors: { hex: string; name: string }[]) => {
    return products.filter((product) =>
      product.colors.some((productColor) =>
        colors.some((collectionColor) => productColor.toLowerCase() === collectionColor.hex.toLowerCase()),
      ),
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Color Collections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="collections" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="collections">{t.collections}</TabsTrigger>
              <TabsTrigger value="inspiration">{t.inspiration}</TabsTrigger>
              <TabsTrigger value="visualizer">{t.visualizer}</TabsTrigger>
            </TabsList>

            <TabsContent value="collections" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Collection List */}
                <div className="lg:col-span-1 space-y-4">
                  {collections.map((collection, index) => (
                    <Card
                      key={collection.id}
                      className={`cursor-pointer transition-all duration-300 ${
                        selectedCollection === index ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                      }`}
                      onClick={() => setSelectedCollection(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{collection.name}</h3>
                          <Badge variant="secondary">{collection.badge}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{collection.description}</p>
                        <div className="flex space-x-1">
                          {collection.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Selected Collection Details */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="w-5 h-5" />
                          {collections[selectedCollection].name}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            {t.downloadPalette}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            {t.sharePalette}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Room Preview */}
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={collections[selectedCollection].image || "/placeholder.svg"}
                          alt={collections[selectedCollection].name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Color Swatches */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {collections[selectedCollection].colors.map((color, index) => (
                          <Card key={index} className="overflow-hidden">
                            <div
                              className="h-24 cursor-pointer hover:scale-105 transition-transform"
                              style={{ backgroundColor: color.hex }}
                              onClick={() => copyToClipboard(color.hex)}
                            />
                            <CardContent className="p-3">
                              <p className="font-medium text-sm">{color.name}</p>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-muted-foreground">{color.hex}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(color.hex)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                              {copiedColor === color.hex && <p className="text-xs text-green-600 mt-1">{t.copied}</p>}
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Matching Products */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">{t.matchingProducts}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {getMatchingProducts(collections[selectedCollection].colors)
                            .slice(0, 3)
                            .map((product) => (
                              <Card key={product.id} className="overflow-hidden">
                                <div className="aspect-square bg-gray-100">
                                  <img
                                    src={product.images[0] || "/placeholder.svg"}
                                    alt={product.name[locale as keyof typeof product.name]}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <CardContent className="p-3">
                                  <h4 className="font-medium text-sm mb-1">
                                    {product.name[locale as keyof typeof product.name]}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-2">${product.price}</p>
                                  <Button
                                    size="sm"
                                    className="w-full"
                                    onClick={() => dispatch({ type: "ADD_ITEM", payload: { product, quantity: 1 } })}
                                  >
                                    {t.shopPaints}
                                  </Button>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inspiration" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) =>
                  collection.rooms.map((room, index) => (
                    <Card key={`${collection.id}-${index}`} className="overflow-hidden group">
                      <div className="relative aspect-[4/3] bg-gray-100">
                        <img
                          src={room || "/placeholder.svg"}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <Button
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          size="sm"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {t.viewRoom}
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{collection.name}</h3>
                        <div className="flex space-x-1">
                          {collection.colors.slice(0, 5).map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color.hex }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )),
                )}
              </div>
            </TabsContent>

            <TabsContent value="visualizer" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Color Visualizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {locale === "ar" ? "أداة تصور الألوان قريباً" : "Color visualizer coming soon"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

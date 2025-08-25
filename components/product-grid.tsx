"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Link from "next/link"

interface ProductGridProps {
  locale: string
  category?: string
  searchParams?: { [key: string]: string | undefined }
}

const translations = {
  en: {
    addToCart: "Add to Cart",
    quickView: "Quick View",
    reviews: "reviews",
    sale: "Sale",
    new: "New",
    bestseller: "Bestseller",
    outOfStock: "Out of Stock",
    loading: "Loading products...",
    noProducts: "No products found",
    noProductsDesc: "Try adjusting your filters or search terms",
    showingResults: "Showing",
    of: "of",
    products: "products",
  },
  ar: {
    addToCart: "أضف للسلة",
    quickView: "عرض سريع",
    reviews: "تقييم",
    sale: "تخفيض",
    new: "جديد",
    bestseller: "الأكثر مبيعاً",
    outOfStock: "نفد المخزون",
    loading: "جاري تحميل المنتجات...",
    noProducts: "لم يتم العثور على منتجات",
    noProductsDesc: "جرب تعديل المرشحات أو مصطلحات البحث",
    showingResults: "عرض",
    of: "من",
    products: "منتج",
  },
}

// Mock product data
const generateProducts = (category?: string, locale?: string) => {
  const baseProducts = [
    {
      id: 1,
      name: locale === "ar" ? "دهان داخلي متميز" : "Premium Interior Paint",
      description: locale === "ar" ? "دهان عالي الجودة للجدران الداخلية" : "High-quality paint for interior walls",
      price: 45.99,
      originalPrice: 55.99,
      rating: 4.8,
      reviews: 124,
      badge: "sale",
      category: "interior",
      image: "/paint-can-interior-premium-white.png",
      colors: ["#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6"],
      inStock: true,
    },
    {
      id: 2,
      name: locale === "ar" ? "دهان خارجي مقاوم للطقس" : "Weather Shield Exterior",
      description: locale === "ar" ? "حماية فائقة ضد العوامل الجوية" : "Superior protection against weather elements",
      price: 62.99,
      rating: 4.9,
      reviews: 89,
      badge: "bestseller",
      category: "exterior",
      image: "/exterior-paint-can-weather-resistant-blue.png",
      colors: ["#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"],
      inStock: true,
    },
    {
      id: 3,
      name: locale === "ar" ? "دهان زخرفي معدني" : "Metallic Decorative Finish",
      description: locale === "ar" ? "لمسة نهائية معدنية أنيقة" : "Elegant metallic finish for accent walls",
      price: 78.99,
      rating: 4.7,
      reviews: 56,
      badge: "new",
      category: "decorative",
      image: "/metallic-paint-finish-gold-decorative.png",
      colors: ["#fbbf24", "#f59e0b", "#d97706", "#b45309"],
      inStock: true,
    },
    {
      id: 4,
      name: locale === "ar" ? "طقم فرش احترافي" : "Professional Brush Set",
      description: locale === "ar" ? "مجموعة فرش عالية الجودة" : "High-quality brush collection for all projects",
      price: 34.99,
      rating: 4.6,
      reviews: 203,
      category: "tools",
      image: "/professional-paint-brush-set-tools.png",
      colors: [],
      inStock: true,
    },
    {
      id: 5,
      name: locale === "ar" ? "دهان داخلي إيكو" : "Eco-Friendly Interior",
      description:
        locale === "ar"
          ? "دهان صديق للبيئة بدون مواد كيميائية ضارة"
          : "Environmentally safe paint with zero harmful chemicals",
      price: 52.99,
      rating: 4.5,
      reviews: 78,
      badge: "new",
      category: "interior",
      image: "/eco-friendly-interior-paint-green.png",
      colors: ["#16a34a", "#15803d", "#166534", "#14532d"],
      inStock: false,
    },
    {
      id: 6,
      name: locale === "ar" ? "أسطوانة طلاء احترافية" : "Professional Paint Roller",
      description:
        locale === "ar" ? "أسطوانة عالية الجودة للتطبيق المتساوي" : "High-quality roller for even application",
      price: 18.99,
      rating: 4.4,
      reviews: 156,
      category: "tools",
      image: "/professional-paint-roller-tool.png",
      colors: [],
      inStock: true,
    },
  ]

  return baseProducts.filter((product) => !category || product.category === category)
}

export function ProductGrid({ locale, category, searchParams }: ProductGridProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadProducts = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      const allProducts = generateProducts(category, locale)

      // Apply filters based on searchParams
      let filteredProducts = allProducts

      if (searchParams?.search) {
        const searchTerm = searchParams.search.toLowerCase()
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
        )
      }

      setProducts(filteredProducts)
      setLoading(false)
    }

    loadProducts()
  }, [category, locale, searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{t.noProducts}</h3>
        <p className="text-muted-foreground">{t.noProductsDesc}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {t.showingResults} {products.length} {t.of} {products.length} {t.products}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted/30">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge
                    className="absolute top-3 left-3"
                    variant={product.badge === "sale" ? "destructive" : "default"}
                  >
                    {t[product.badge as keyof typeof t] || product.badge}
                  </Badge>
                )}
                <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} flex flex-col gap-2`}>
                  <Button size="icon" variant="ghost" className="bg-background/80 hover:bg-background">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="bg-background/80 hover:bg-background">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">{t.outOfStock}</Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Link href={`/${locale}/product/${product.id}`}>
                    <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                </div>

                {/* Colors */}
                {product.colors.length > 0 && (
                  <div className={`flex ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                    {product.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                {/* Rating */}
                <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} {t.reviews})
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <Button size="sm" disabled={!product.inStock} className="group">
                    <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    {t.addToCart}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

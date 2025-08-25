"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { products } from "@/lib/products"

interface FeaturedProductsProps {
  locale: string
}

const translations = {
  en: {
    title: "Featured Products",
    subtitle: "Our most popular paints chosen by professionals",
    viewAll: "View All Products",
    addToCart: "Add to Cart",
    bestseller: "Bestseller",
    new: "New",
    sale: "Sale",
    reviews: "reviews",
    from: "From",
  },
  ar: {
    title: "المنتجات المميزة",
    subtitle: "أشهر دهاناتنا المختارة من قبل المحترفين",
    viewAll: "عرض جميع المنتجات",
    addToCart: "أضف للسلة",
    bestseller: "الأكثر مبيعاً",
    new: "جديد",
    sale: "تخفيض",
    reviews: "تقييم",
    from: "من",
  },
}

export function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"
  const { dispatch } = useCart()

  const featuredProducts = products.slice(0, 4) // Show first 4 products as featured

  const handleAddToCart = (product: (typeof products)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity: 1 },
    })
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{t.subtitle}</p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/${locale}/products`}>{t.viewAll}</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted/30">
                  <Link href={`/${locale}/product/${product.id}`}>
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name[locale as keyof typeof product.name]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3" variant="destructive">
                      {t.sale}
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <Link href={`/${locale}/product/${product.id}`}>
                      <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">
                        {product.name[locale as keyof typeof product.name]}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.description[locale as keyof typeof product.description]}
                    </p>
                  </div>

                  {/* Colors */}
                  {product.colors.length > 0 && (
                    <div className={`flex ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"}`}>
                      {product.colors.slice(0, 4).map((color, index) => (
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
                    <Button size="sm" className="group" onClick={() => handleAddToCart(product)}>
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
    </section>
  )
}

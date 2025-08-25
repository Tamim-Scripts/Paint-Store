"use client"

import { notFound } from "next/navigation"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"

// Mock product data - in a real app, this would come from a database
const products = {
  "premium-white-interior": {
    id: "premium-white-interior",
    name: { en: "Premium White Interior Paint", ar: "دهان داخلي أبيض فاخر" },
    price: 45.99,
    originalPrice: 52.99,
    rating: 4.8,
    reviews: 124,
    category: "interior",
    brand: "PaintPro",
    colors: ["#FFFFFF", "#F8F8FF", "#F5F5F5", "#FFFAFA"],
    coverage: "400 sq ft",
    finish: { en: "Matte", ar: "مطفي" },
    features: {
      en: ["Low VOC", "Easy Application", "Washable", "Quick Dry"],
      ar: ["منخفض المركبات العضوية", "سهل التطبيق", "قابل للغسيل", "سريع الجفاف"],
    },
    description: {
      en: "Our premium white interior paint delivers exceptional coverage and durability. Perfect for living rooms, bedrooms, and any interior space requiring a clean, fresh look.",
      ar: "يوفر دهاننا الداخلي الأبيض الفاخر تغطية استثنائية ومتانة. مثالي لغرف المعيشة وغرف النوم وأي مساحة داخلية تتطلب مظهراً نظيفاً ومنعشاً.",
    },
    specifications: {
      en: {
        Base: "Water-based",
        Coverage: "400 sq ft per gallon",
        "Dry Time": "2-4 hours",
        "Recoat Time": "4-6 hours",
        Cleanup: "Soap and water",
      },
      ar: {
        القاعدة: "مائي",
        التغطية: "400 قدم مربع لكل جالون",
        "وقت الجفاف": "2-4 ساعات",
        "وقت إعادة الطلاء": "4-6 ساعات",
        التنظيف: "صابون وماء",
      },
    },
    images: ["/paint-can-interior-premium-white.png", "/modern-living-room-with-beautiful-paint-colors--in.png"],
  },
}

interface ProductPageProps {
  params: { locale: string; id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { locale, id } = params
  const isRTL = locale === "ar"
  const product = products[id as keyof typeof products]
  const { dispatch } = useCart()

  if (!product) {
    notFound()
  }

  const handleAddToCart = (selectedColor?: string) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity: 1, selectedColor },
    })
  }

  const t = {
    addToCart: locale === "ar" ? "أضف إلى السلة" : "Add to Cart",
    addToWishlist: locale === "ar" ? "أضف إلى المفضلة" : "Add to Wishlist",
    share: locale === "ar" ? "مشاركة" : "Share",
    description: locale === "ar" ? "الوصف" : "Description",
    specifications: locale === "ar" ? "المواصفات" : "Specifications",
    reviews: locale === "ar" ? "التقييمات" : "Reviews",
    features: locale === "ar" ? "المميزات" : "Features",
    colors: locale === "ar" ? "الألوان المتاحة" : "Available Colors",
    inStock: locale === "ar" ? "متوفر" : "In Stock",
    coverage: locale === "ar" ? "التغطية" : "Coverage",
    finish: locale === "ar" ? "النهاية" : "Finish",
    brand: locale === "ar" ? "العلامة التجارية" : "Brand",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name[locale as keyof typeof product.name]}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name[locale as keyof typeof product.name]} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name[locale as keyof typeof product.name]}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} {locale === "ar" ? "تقييم" : "reviews"})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-emerald-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">{t.brand}:</span> {product.brand}
            </div>
            <div>
              <span className="font-medium">{t.coverage}:</span> {product.coverage}
            </div>
            <div>
              <span className="font-medium">{t.finish}:</span> {product.finish[locale as keyof typeof product.finish]}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{t.inStock}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">{t.colors}</h3>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-emerald-500 transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                  onClick={() => handleAddToCart(color)}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">{t.features}</h3>
            <div className="flex flex-wrap gap-2">
              {product.features[locale as keyof typeof product.features].map((feature, index) => (
                <Badge key={index} variant="outline">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" onClick={() => handleAddToCart()}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {t.addToCart}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">{t.description}</TabsTrigger>
          <TabsTrigger value="specifications">{t.specifications}</TabsTrigger>
          <TabsTrigger value="reviews">{t.reviews}</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.description[locale as keyof typeof product.description]}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications[locale as keyof typeof product.specifications]).map(
              ([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ),
            )}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">{product.rating}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {product.reviews} {locale === "ar" ? "تقييم" : "reviews"}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Sample reviews */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">John D.</span>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-700">
                  Excellent coverage and easy to apply. The finish looks professional and the color is exactly as
                  expected.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

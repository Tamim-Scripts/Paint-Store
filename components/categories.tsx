import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Building, Sparkles, Wrench } from "lucide-react"
import Link from "next/link"

interface CategoriesProps {
  locale: string
}

const translations = {
  en: {
    title: "Shop by Category",
    subtitle: "Find the perfect paint for every project",
    interior: {
      name: "Interior Paint",
      desc: "Premium indoor paints for walls, ceilings, and trim",
      products: "200+ Products",
    },
    exterior: {
      name: "Exterior Paint",
      desc: "Weather-resistant paints for outdoor surfaces",
      products: "150+ Products",
    },
    decorative: {
      name: "Decorative Paints",
      desc: "Specialty finishes and textured paints",
      products: "80+ Products",
    },
    tools: {
      name: "Tools & Supplies",
      desc: "Professional brushes, rollers, and accessories",
      products: "300+ Products",
    },
    shopNow: "Shop Now",
  },
  ar: {
    title: "تسوق حسب الفئة",
    subtitle: "اعثر على الدهان المثالي لكل مشروع",
    interior: {
      name: "دهان داخلي",
      desc: "دهانات داخلية متميزة للجدران والأسقف والتشطيبات",
      products: "أكثر من 200 منتج",
    },
    exterior: {
      name: "دهان خارجي",
      desc: "دهانات مقاومة للطقس للأسطح الخارجية",
      products: "أكثر من 150 منتج",
    },
    decorative: {
      name: "دهانات زخرفية",
      desc: "تشطيبات خاصة ودهانات ذات ملمس",
      products: "أكثر من 80 منتج",
    },
    tools: {
      name: "أدوات ومستلزمات",
      desc: "فرش وأسطوانات وإكسسوارات احترافية",
      products: "أكثر من 300 منتج",
    },
    shopNow: "تسوق الآن",
  },
}

export function Categories({ locale }: CategoriesProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"

  const categories = [
    {
      icon: Home,
      ...t.interior,
      href: `/${locale}/interior`,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: Building,
      ...t.exterior,
      href: `/${locale}/exterior`,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Sparkles,
      ...t.decorative,
      href: `/${locale}/decorative`,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Wrench,
      ...t.tools,
      href: `/${locale}/tools`,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{category.desc}</p>
                    <p className="text-xs font-medium text-primary">{category.products}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground bg-transparent"
                  >
                    <Link href={category.href}>{t.shopNow}</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

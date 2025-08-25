'use client'
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"
import { Suspense, use } from "react"

interface DecorativePageProps {
  params: { locale: string }
  searchParams: { search?: string; color?: string; price?: string }
}

const translations = {
  en: {
    title: "Decorative Paints",
    subtitle: "Specialty finishes and textured paints",
    description:
      "Add character and style to your spaces with our decorative paint collection. From metallic finishes to textured walls, create unique looks that reflect your personality.",
  },
  ar: {
    title: "دهانات زخرفية",
    subtitle: "تشطيبات خاصة ودهانات ذات ملمس",
    description:
      "أضف طابعاً وأناقة لمساحاتك مع مجموعة دهاناتنا الزخرفية. من التشطيبات المعدنية إلى الجدران ذات الملمس، اخلق إطلالات فريدة تعكس شخصيتك.",
  },
}

export default async function DecorativePage({ params, searchParams }: DecorativePageProps) {
  const { locale } = params
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-muted-foreground mb-4">{t.subtitle}</p>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilters locale={locale} category="decorative" />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-6">
            <Suspense>
              <ProductSearch locale={locale} />
            </Suspense>
          </div>
          <ProductGrid locale={locale} category="decorative" searchParams={searchParams} />
        </div>
      </div>
    </div>
  )
}

import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"

interface InteriorPageProps {
  params: { locale: string }
  // searchParams: { search?: string; color?: string; price?: string }
}

const translations = {
  en: {
    title: "Interior Paint",
    subtitle: "Premium indoor paints for walls, ceilings, and trim",
    description:
      "Transform your indoor spaces with our high-quality interior paints. From living rooms to bedrooms, our paints provide excellent coverage, durability, and beautiful finishes.",
  },
  ar: {
    title: "دهان داخلي",
    subtitle: "دهانات داخلية متميزة للجدران والأسقف والتشطيبات",
    description:
      "حوّل مساحاتك الداخلية بدهاناتنا الداخلية عالية الجودة. من غرف المعيشة إلى غرف النوم، توفر دهاناتنا تغطية ممتازة ومتانة ولمسات نهائية جميلة.",
  },
}

export default function InteriorPage({ params }: InteriorPageProps) {
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
          {/* <ProductFilters locale={locale} category="interior" /> */}
        </div>
        <div className="lg:col-span-3">
          <div className="mb-6">
            {/* <ProductSearch locale={locale} /> */}
          </div>
          {/* <ProductGrid locale={locale} category="interior" searchParams={searchParams} /> */}
        </div>
      </div>
    </div>
  )
}

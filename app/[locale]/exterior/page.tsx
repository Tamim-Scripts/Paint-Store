import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"

interface ExteriorPageProps {
  params: { locale: string }
  // searchParams: { search?: string; color?: string; price?: string }
}

const translations = {
  en: {
    title: "Exterior Paint",
    subtitle: "Weather-resistant paints for outdoor surfaces",
    description:
      "Protect and beautify your home's exterior with our durable outdoor paints. Formulated to withstand harsh weather conditions while maintaining vibrant colors year after year.",
  },
  ar: {
    title: "دهان خارجي",
    subtitle: "دهانات مقاومة للطقس للأسطح الخارجية",
    description:
      "احم وجمّل الجزء الخارجي من منزلك بدهاناتنا الخارجية المتينة. مُصممة لتحمل الظروف الجوية القاسية مع الحفاظ على الألوان النابضة بالحياة عاماً بعد عام.",
  },
}

export default function ExteriorPage({ params }: ExteriorPageProps) {
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
          {/* <ProductFilters locale={locale} category="exterior" /> */}
        </div>
        <div className="lg:col-span-3">
          <div className="mb-6">
            {/* <ProductSearch locale={locale} /> */}
          </div>
          {/* <ProductGrid locale={locale} category="exterior" searchParams={searchParams} /> */}
        </div>
      </div>
    </div>
  )
}

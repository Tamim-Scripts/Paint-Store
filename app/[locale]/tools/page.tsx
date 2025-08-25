import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"

interface ToolsPageProps {
  params: { locale: string }
  searchParams: { search?: string; price?: string; brand?: string }
}

const translations = {
  en: {
    title: "Tools & Supplies",
    subtitle: "Professional brushes, rollers, and accessories",
    description:
      "Complete your painting project with our professional-grade tools and supplies. From precision brushes to heavy-duty rollers, we have everything you need for perfect results.",
  },
  ar: {
    title: "أدوات ومستلزمات",
    subtitle: "فرش وأسطوانات وإكسسوارات احترافية",
    description:
      "أكمل مشروع الطلاء الخاص بك بأدواتنا ومستلزماتنا الاحترافية. من الفرش الدقيقة إلى الأسطوانات الثقيلة، لدينا كل ما تحتاجه للحصول على نتائج مثالية.",
  },
}

export default function ToolsPage({ params, searchParams }: ToolsPageProps) {
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
          <ProductFilters locale={locale} category="tools" />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-6">
            <ProductSearch locale={locale} />
          </div>
          <ProductGrid locale={locale} category="tools" searchParams={searchParams} />
        </div>
      </div>
    </div>
  )
}

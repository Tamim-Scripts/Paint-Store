import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSearch } from "@/components/product-search"

interface ProductsPageProps {
  params: { locale: string }
  // searchParams: { category?: string; search?: string; color?: string; price?: string }
}

const translations = {
  en: {
    title: "All Products",
    subtitle: "Discover our complete range of premium paints and supplies",
    results: "products found",
    noResults: "No products found",
    noResultsDesc: "Try adjusting your filters or search terms",
  },
  ar: {
    title: "جميع المنتجات",
    subtitle: "اكتشف مجموعتنا الكاملة من الدهانات والمستلزمات المتميزة",
    results: "منتج موجود",
    noResults: "لم يتم العثور على منتجات",
    noResultsDesc: "جرب تعديل المرشحات أو مصطلحات البحث",
  },
}

export default function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = params
  const t = translations[locale as keyof typeof translations] || translations.en

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          {/* <ProductFilters locale={locale} /> */}
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            {/* <ProductSearch locale={locale} /> */}
          </div>
          {/* <ProductGrid locale={locale} searchParams={searchParams} /> */}
        </div>
      </div>
    </div>
  )
}

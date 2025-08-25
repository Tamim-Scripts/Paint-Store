import type { Metadata } from "next"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { FeaturedProducts } from "@/components/featured-products"
import { ColorCollections } from "@/components/color-collections"
import { Newsletter } from "@/components/newsletter"

interface HomePageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: "Premium Paints & Color Collections | PaintStore",
    ar: "دهانات فاخرة ومجموعات ألوان | متجر الدهانات"
  }
  
  const descriptions = {
    en: "Discover premium interior and exterior paints, expert color collections, and professional painting supplies. Free color consultation and delivery available.",
    ar: "اكتشف الدهانات الداخلية والخارجية الفاخرة، ومجموعات الألوان الخبيرة، ومستلزمات الطلاء الاحترافية. استشارة ألوان مجانية وتوصيل متاح."
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: [
        {
          url: "/og-homepage.png",
          width: 1200,
          height: 630,
          alt: "PaintStore Homepage - Premium Paints & Colors",
        },
      ],
    },
  }
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params

  return (
    <>
      {/* <CHANGE> Added structured data for homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: locale === "ar" ? "متجر الدهانات - الصفحة الرئيسية" : "PaintStore - Home",
            description: locale === "ar" 
              ? "اكتشف الدهانات الداخلية والخارجية الفاخرة، ومجموعات الألوان الخبيرة"
              : "Discover premium interior and exterior paints, expert color collections",
            url: `https://paintstore.vercel.app/${locale}`,
            mainEntity: {
              "@type": "Store",
              name: "PaintStore",
              description: locale === "ar" 
                ? "متجر دهانات احترافي يقدم دهانات عالية الجودة"
                : "Professional paint store offering high-quality paints",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: locale === "ar" ? "كتالوج الدهانات" : "Paint Catalog",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Product",
                      name: locale === "ar" ? "دهانات داخلية" : "Interior Paints",
                      category: "Paint"
                    }
                  },
                  {
                    "@type": "Offer", 
                    itemOffered: {
                      "@type": "Product",
                      name: locale === "ar" ? "دهانات خارجية" : "Exterior Paints",
                      category: "Paint"
                    }
                  }
                ]
              }
            }
          })
        }}
      />
      <div className="space-y-16">
        <Hero locale={locale} />
        <Categories locale={locale} />
        <FeaturedProducts locale={locale} />
        <ColorCollections locale={locale} />
        <Newsletter locale={locale} />
      </div>
    </>
  )
}

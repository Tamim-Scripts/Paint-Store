"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Palette } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  locale: string
}

const translations = {
  en: {
    title: "Transform Your Space with Premium Colors",
    subtitle: "Discover our exclusive collection of interior and exterior paints designed to bring your vision to life",
    cta: "Shop Now",
    featured: "Featured Collection",
    collectionName: "Nature's Harmony",
    collectionDesc: "Earthy tones inspired by natural landscapes",
  },
  ar: {
    title: "حوّل مساحتك بألوان متميزة",
    subtitle: "اكتشف مجموعتنا الحصرية من الدهانات الداخلية والخارجية المصممة لتحقيق رؤيتك",
    cta: "تسوق الآن",
    featured: "المجموعة المميزة",
    collectionName: "انسجام الطبيعة",
    collectionDesc: "ألوان ترابية مستوحاة من المناظر الطبيعية",
  },
}

export function Hero({ locale }: HeroProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <img
        src="/1.jpg"
        alt="Beautiful painted interior room"
        role="presentation"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay gradient to improve text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />

      <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className={`space-y-8 text-center max-w-3xl ${isRTL ? "lg:order-2" : ""}`}>
            <div className="space-y-4">
              {/* <div
                className={`inline-flex items-center justify-center ${isRTL ? "space-x-reverse space-x-2" : "space-x-2"} bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium`}
              >
                <Palette className="h-4 w-4" />
                <span>{t.featured}</span>
              </div> */}
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">{t.title}</h1>
              <p className="text-lg text-white/90 leading-relaxed mx-auto">{t.subtitle}</p>
            </div>

            <div className={`flex items-center justify-center ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"} flex-wrap gap-4`}>
              <Button asChild size="lg" className="group">
                <Link href={`/${locale}/products`}>
                  {t.cta}
                  <ArrowRight
                    className={`ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform ${isRTL ? "rtl:rotate-180" : ""}`}
                  />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`/${locale}/colors`}>Explore Colors</Link>
              </Button>
            </div>

            <div className="bg-card/80 p-6 rounded-lg border mx-auto">
              <h3 className="font-semibold text-lg mb-2">{t.collectionName}</h3>
              <p className="text-muted-foreground">{t.collectionDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

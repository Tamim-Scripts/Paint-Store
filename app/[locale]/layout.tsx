import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

const locales = ["en", "ar"] as const
type Locale = (typeof locales)[number]

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params

  const titles = {
    en: "PaintStore - Premium Paints & Colors",
    ar: "متجر الدهانات - دهانات وألوان فاخرة",
  }

  const descriptions = {
    en: "Professional paint retailer offering interior, exterior, and decorative paints with expert color consultation. Premium quality paints for homes and businesses.",
    ar: "متجر دهانات احترافي يقدم دهانات داخلية وخارجية وزخرفية مع استشارات خبراء الألوان. دهانات عالية الجودة للمنازل والشركات.",
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
        "ar-SA": "/ar",
      },
    },
    openGraph: {
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
    },
  }
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const isRTL = locale === "ar"

  return (
    <CartProvider>
      <div className={`min-h-screen flex flex-col ${isRTL ? "font-arabic" : "font-sans"}`} dir={isRTL ? "rtl" : "ltr"}>
        <Header locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
        <CartDrawer locale={locale} />
      </div>
    </CartProvider>
  )
}

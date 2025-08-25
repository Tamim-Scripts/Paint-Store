import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Tajawal } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-tajawal",
})

export const metadata: Metadata = {
  title: {
    default: "PaintStore - Premium Paints & Colors | Professional Paint Retailer",
    template: "%s | PaintStore",
  },
  description:
    "Professional paint retailer offering interior, exterior, and decorative paints with expert color consultation. Premium quality paints for homes and businesses with free delivery.",
  keywords: [
    "paint store",
    "interior paint",
    "exterior paint",
    "decorative paint",
    "color consultation",
    "premium paints",
    "paint delivery",
    "professional paints",
    "paint supplies",
    "color collections",
  ],
  authors: [{ name: "PaintStore Team" }],
  creator: "PaintStore",
  publisher: "PaintStore",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://paintstore.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "ar-SA": "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paintstore.vercel.app",
    title: "PaintStore - Premium Paints & Colors",
    description:
      "Professional paint retailer offering interior, exterior, and decorative paints with expert color consultation.",
    siteName: "PaintStore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PaintStore - Premium Paints & Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PaintStore - Premium Paints & Colors",
    description:
      "Professional paint retailer offering interior, exterior, and decorative paints with expert color consultation.",
    images: ["/og-image.png"],
    creator: "@paintstore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PaintStore",
              description: "Professional paint retailer offering interior, exterior, and decorative paints",
              url: "https://paintstore.vercel.app",
              logo: "https://paintstore.vercel.app/logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+966-11-123-4567",
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Paint Street",
                addressLocality: "Color City",
                postalCode: "12345",
                addressCountry: "SA",
              },
              sameAs: [
                "https://facebook.com/paintstore",
                "https://twitter.com/paintstore",
                "https://instagram.com/paintstore",
              ],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${tajawal.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}

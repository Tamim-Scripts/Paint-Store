"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

interface NewsletterProps {
  locale: string
}

const translations = {
  en: {
    title: "Stay Updated with Color Trends",
    subtitle: "Get the latest color inspirations, painting tips, and exclusive offers delivered to your inbox",
    placeholder: "Enter your email address",
    subscribe: "Subscribe Now",
    subscribing: "Subscribing...",
    success: "Thank you for subscribing!",
    successDesc: "You'll receive our latest updates and exclusive offers.",
    privacy: "We respect your privacy. Unsubscribe at any time.",
  },
  ar: {
    title: "ابق على اطلاع بأحدث اتجاهات الألوان",
    subtitle: "احصل على أحدث إلهامات الألوان ونصائح الطلاء والعروض الحصرية في بريدك الإلكتروني",
    placeholder: "أدخل عنوان بريدك الإلكتروني",
    subscribe: "اشترك الآن",
    subscribing: "جاري الاشتراك...",
    success: "شكراً لك على الاشتراك!",
    successDesc: "ستتلقى أحدث التحديثات والعروض الحصرية.",
    privacy: "نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
  },
}

export function Newsletter({ locale }: NewsletterProps) {
  const t = translations[locale as keyof typeof translations] || translations.en
  const isRTL = locale === "ar"
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubscribing(false)
    setIsSubscribed(true)
  }

  if (isSubscribed) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.success}</h3>
              <p className="text-muted-foreground">{t.successDesc}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">{t.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`flex ${isRTL ? "flex-row-reverse" : ""} gap-4`}>
                <Input
                  type="email"
                  placeholder={t.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                  dir={isRTL ? "rtl" : "ltr"}
                />
                <Button type="submit" disabled={isSubscribing} className="px-8">
                  {isSubscribing ? t.subscribing : t.subscribe}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">{t.privacy}</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

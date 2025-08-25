import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

interface FooterProps {
  locale: "en" | "ar"
}

const translations = {
  en: {
    about: "About PaintStore",
    aboutText:
      "Your trusted partner for premium paints and colors. We provide high-quality interior and exterior paints with expert color consultation.",
    quickLinks: "Quick Links",
    categories: "Categories",
    support: "Customer Support",
    contact: "Contact Info",
    newsletter: "Newsletter",
    newsletterText: "Subscribe to get updates on new colors and special offers.",
    subscribe: "Subscribe",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    returns: "Returns & Exchanges",
    shipping: "Shipping Info",
    faq: "FAQ",
    interior: "Interior Paint",
    exterior: "Exterior Paint",
    decorative: "Decorative Paints",
    tools: "Tools & Supplies",
    home: "Home",
    aboutUs: "About Us",
    contactUs: "Contact Us",
  },
  ar: {
    about: "حول متجر الدهانات",
    aboutText:
      "شريكك الموثوق للدهانات والألوان المتميزة. نوفر دهانات داخلية وخارجية عالية الجودة مع استشارة خبراء الألوان.",
    quickLinks: "روابط سريعة",
    categories: "الفئات",
    support: "دعم العملاء",
    contact: "معلومات الاتصال",
    newsletter: "النشرة الإخبارية",
    newsletterText: "اشترك للحصول على تحديثات حول الألوان الجديدة والعروض الخاصة.",
    subscribe: "اشتراك",
    rights: "جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    returns: "الإرجاع والاستبدال",
    shipping: "معلومات الشحن",
    faq: "الأسئلة الشائعة",
    interior: "دهان داخلي",
    exterior: "دهان خارجي",
    decorative: "دهانات زخرفية",
    tools: "أدوات ومستلزمات",
    home: "الرئيسية",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
  },
}

export function Footer({ locale }: FooterProps) {
  const t = translations[locale]
  const isRTL = locale === "ar"

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.about}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.aboutText}</p>
            <div className={`flex ${isRTL ? "space-x-reverse space-x-4" : "space-x-4"}`}>
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="text-muted-foreground hover:text-primary">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-muted-foreground hover:text-primary">
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-muted-foreground hover:text-primary">
                  {t.contactUs}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="text-muted-foreground hover:text-primary">
                  {t.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.categories}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/interior`} className="text-muted-foreground hover:text-primary">
                  {t.interior}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/exterior`} className="text-muted-foreground hover:text-primary">
                  {t.exterior}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/decorative`} className="text-muted-foreground hover:text-primary">
                  {t.decorative}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools`} className="text-muted-foreground hover:text-primary">
                  {t.tools}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.contact}</h3>
            <div className="space-y-3 text-sm">
              <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">0500005480</span>
              </div>
              <div className={`flex items-center ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@paintstore.com</span>
              </div>
              <div className={`flex items-start ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">123 Paint Street, Color City, CC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">© 2024 PaintStore. {t.rights}</p>
          <div className={`flex ${isRTL ? "space-x-reverse space-x-6" : "space-x-6"} text-sm`}>
            <Link href={`/${locale}/privacy`} className="text-muted-foreground hover:text-primary">
              {t.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="text-muted-foreground hover:text-primary">
              {t.terms}
            </Link>
            <Link href={`/${locale}/returns`} className="text-muted-foreground hover:text-primary">
              {t.returns}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

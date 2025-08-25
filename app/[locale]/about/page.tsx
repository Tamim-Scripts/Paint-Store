import { CheckCircle, Users, Award, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface AboutPageProps {
  params: { locale: string }
}

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = params
  const isRTL = locale === "ar"

  const t = {
    title: locale === "ar" ? "من نحن" : "About Us",
    subtitle: locale === "ar" ? "رائدون في عالم الدهانات منذ عام 1985" : "Leading the paint industry since 1985",
    story: {
      title: locale === "ar" ? "قصتنا" : "Our Story",
      content:
        locale === "ar"
          ? "بدأت رحلتنا في عام 1985 كمتجر صغير للدهانات في قلب المدينة. اليوم، نحن فخورون بكوننا واحدة من أكبر موردي الدهانات عالية الجودة في المنطقة، نخدم كل من المحترفين وأصحاب المنازل بأفضل المنتجات والخدمات."
          : "Our journey began in 1985 as a small paint shop in the heart of the city. Today, we're proud to be one of the region's largest suppliers of premium paints, serving both professionals and homeowners with the finest products and services.",
    },
    mission: {
      title: locale === "ar" ? "مهمتنا" : "Our Mission",
      content:
        locale === "ar"
          ? "نسعى لتوفير أفضل الدهانات والألوان التي تحول المساحات إلى أعمال فنية. نؤمن بأن كل جدار يحكي قصة، ونحن هنا لمساعدتك في سرد قصتك بأجمل الألوان."
          : "We strive to provide the finest paints and colors that transform spaces into works of art. We believe every wall tells a story, and we're here to help you tell yours with the most beautiful colors.",
    },
    values: {
      title: locale === "ar" ? "قيمنا" : "Our Values",
      items: [
        {
          icon: CheckCircle,
          title: locale === "ar" ? "الجودة" : "Quality",
          description:
            locale === "ar" ? "نختار فقط أفضل المواد والتقنيات" : "We select only the finest materials and techniques",
        },
        {
          icon: Users,
          title: locale === "ar" ? "خدمة العملاء" : "Customer Service",
          description:
            locale === "ar" ? "فريقنا المتخصص يقدم المشورة الخبيرة" : "Our expert team provides professional guidance",
        },
        {
          icon: Award,
          title: locale === "ar" ? "الابتكار" : "Innovation",
          description:
            locale === "ar"
              ? "نواكب أحدث التقنيات في عالم الدهانات"
              : "We stay ahead with the latest paint technologies",
        },
        {
          icon: Truck,
          title: locale === "ar" ? "التوصيل السريع" : "Fast Delivery",
          description: locale === "ar" ? "توصيل سريع وآمن لجميع طلباتك" : "Quick and safe delivery for all your orders",
        },
      ],
    },
    stats: {
      title: locale === "ar" ? "إنجازاتنا بالأرقام" : "Our Achievements in Numbers",
      items: [
        { number: "35+", label: locale === "ar" ? "سنة من الخبرة" : "Years of Experience" },
        { number: "10,000+", label: locale === "ar" ? "عميل راضٍ" : "Happy Customers" },
        { number: "500+", label: locale === "ar" ? "منتج متاح" : "Products Available" },
        { number: "50+", label: locale === "ar" ? "خبير دهانات" : "Paint Experts" },
      ],
    },
    cta: {
      title: locale === "ar" ? "جاهز لبدء مشروعك؟" : "Ready to Start Your Project?",
      subtitle:
        locale === "ar" ? "تواصل معنا اليوم للحصول على استشارة مجانية" : "Contact us today for a free consultation",
      button: locale === "ar" ? "تواصل معنا" : "Contact Us",
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">{t.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.story.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{t.story.content}</p>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="/modern-living-room-with-beautiful-paint-colors--in.png"
                  alt="Paint store history"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">{t.mission.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{t.mission.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.stats.title}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.items.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl mb-8 opacity-90">{t.cta.subtitle}</p>
          <Button asChild size="lg" variant="secondary">
            <Link href={`/${locale}/contact`}>{t.cta.button}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

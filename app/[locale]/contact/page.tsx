import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ContactPageProps {
  params: { locale: string }
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params
  const isRTL = locale === "ar"

  const t = {
    title: locale === "ar" ? "تواصل معنا" : "Contact Us",
    subtitle:
      locale === "ar"
        ? "نحن هنا لمساعدتك في جميع احتياجاتك من الدهانات"
        : "We're here to help with all your paint needs",
    form: {
      title: locale === "ar" ? "أرسل لنا رسالة" : "Send us a Message",
      name: locale === "ar" ? "الاسم الكامل" : "Full Name",
      email: locale === "ar" ? "البريد الإلكتروني" : "Email Address",
      phone: locale === "ar" ? "رقم الهاتف" : "Phone Number",
      subject: locale === "ar" ? "الموضوع" : "Subject",
      message: locale === "ar" ? "الرسالة" : "Message",
      send: locale === "ar" ? "إرسال الرسالة" : "Send Message",
      namePlaceholder: locale === "ar" ? "أدخل اسمك الكامل" : "Enter your full name",
      emailPlaceholder: locale === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address",
      phonePlaceholder: locale === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number",
      subjectPlaceholder: locale === "ar" ? "ما هو موضوع رسالتك؟" : "What's your message about?",
      messagePlaceholder: locale === "ar" ? "اكتب رسالتك هنا..." : "Write your message here...",
    },
    info: {
      title: locale === "ar" ? "معلومات التواصل" : "Contact Information",
      address: {
        title: locale === "ar" ? "العنوان" : "Address",
        value:
          locale === "ar"
            ? "شارع الملك فهد، الرياض 12345، المملكة العربية السعودية"
            : "123 Paint Street, Color City, PC 12345",
      },
      phone: {
        title: locale === "ar" ? "الهاتف" : "Phone",
        value: "+966 11 123 4567",
      },
      email: {
        title: locale === "ar" ? "البريد الإلكتروني" : "Email",
        value: "info@paintstore.com",
      },
      hours: {
        title: locale === "ar" ? "ساعات العمل" : "Business Hours",
        weekdays: locale === "ar" ? "الأحد - الخميس: 8:00 ص - 8:00 م" : "Sunday - Thursday: 8:00 AM - 8:00 PM",
        weekend: locale === "ar" ? "الجمعة - السبت: 9:00 ص - 6:00 م" : "Friday - Saturday: 9:00 AM - 6:00 PM",
      },
    },
    services: {
      title: locale === "ar" ? "خدماتنا" : "Our Services",
      items: [
        locale === "ar" ? "استشارات الألوان المجانية" : "Free Color Consultations",
        locale === "ar" ? "خدمة التوصيل المجاني" : "Free Delivery Service",
        locale === "ar" ? "دعم فني متخصص" : "Expert Technical Support",
        locale === "ar" ? "ضمان الجودة" : "Quality Guarantee",
      ],
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

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  {t.form.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">{t.form.name}</Label>
                      <Input id="name" placeholder={t.form.namePlaceholder} required />
                    </div>
                    <div>
                      <Label htmlFor="email">{t.form.email}</Label>
                      <Input id="email" type="email" placeholder={t.form.emailPlaceholder} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{t.form.phone}</Label>
                      <Input id="phone" type="tel" placeholder={t.form.phonePlaceholder} />
                    </div>
                    <div>
                      <Label htmlFor="subject">{t.form.subject}</Label>
                      <Input id="subject" placeholder={t.form.subjectPlaceholder} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">{t.form.message}</Label>
                    <Textarea id="message" placeholder={t.form.messagePlaceholder} rows={6} required />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    {t.form.send}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t.info.address.title}</h3>
                      <p className="text-muted-foreground">{t.info.address.value}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t.info.phone.title}</h3>
                      <p className="text-muted-foreground">{t.info.phone.value}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t.info.email.title}</h3>
                      <p className="text-muted-foreground">{t.info.email.value}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{t.info.hours.title}</h3>
                      <p className="text-muted-foreground">{t.info.hours.weekdays}</p>
                      <p className="text-muted-foreground">{t.info.hours.weekend}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.services.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {t.services.items.map((service, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{locale === "ar" ? "موقعنا" : "Find Us"}</h2>
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <MapPin className="w-12 h-12 mb-2" />
              <span className="ml-2">{locale === "ar" ? "خريطة الموقع" : "Interactive Map"}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { CheckCircle, Truck, Shield } from "lucide-react"
import { CheckoutForm } from "@/components/checkout-form"

interface CheckoutPageProps {
  params: { locale: string }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale } = params
  const isRTL = locale === "ar"

  const t = {
    checkout: locale === "ar" ? "الدفع" : "Checkout",
    orderSummary: locale === "ar" ? "ملخص الطلب" : "Order Summary",
    shippingInfo: locale === "ar" ? "معلومات الشحن" : "Shipping Information",
    paymentInfo: locale === "ar" ? "معلومات الدفع" : "Payment Information",
    placeOrder: locale === "ar" ? "تأكيد الطلب" : "Place Order",
    secureCheckout: locale === "ar" ? "دفع آمن" : "Secure Checkout",
    freeShipping: locale === "ar" ? "شحن مجاني" : "Free Shipping",
    moneyBack: locale === "ar" ? "ضمان استرداد الأموال" : "Money Back Guarantee",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t.checkout}</h1>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium">{t.secureCheckout}</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium">{t.freeShipping}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium">{t.moneyBack}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <CheckoutForm locale={locale} />
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{t.orderSummary}</h2>
              {/* Order summary will be populated by the CheckoutForm component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

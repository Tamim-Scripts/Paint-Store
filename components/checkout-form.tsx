"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

interface CheckoutFormProps {
  locale: string
}

export function CheckoutForm({ locale }: CheckoutFormProps) {
  const { state, dispatch } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const t = {
    shippingInfo: locale === "ar" ? "معلومات الشحن" : "Shipping Information",
    paymentInfo: locale === "ar" ? "معلومات الدفع" : "Payment Information",
    firstName: locale === "ar" ? "الاسم الأول" : "First Name",
    lastName: locale === "ar" ? "الاسم الأخير" : "Last Name",
    email: locale === "ar" ? "البريد الإلكتروني" : "Email",
    phone: locale === "ar" ? "رقم الهاتف" : "Phone",
    address: locale === "ar" ? "العنوان" : "Address",
    city: locale === "ar" ? "المدينة" : "City",
    postalCode: locale === "ar" ? "الرمز البريدي" : "Postal Code",
    cardNumber: locale === "ar" ? "رقم البطاقة" : "Card Number",
    expiryDate: locale === "ar" ? "تاريخ الانتهاء" : "Expiry Date",
    cvv: locale === "ar" ? "رمز الأمان" : "CVV",
    cardholderName: locale === "ar" ? "اسم حامل البطاقة" : "Cardholder Name",
    placeOrder: locale === "ar" ? "تأكيد الطلب" : "Place Order",
    processing: locale === "ar" ? "جاري المعالجة..." : "Processing...",
    subtotal: locale === "ar" ? "المجموع الفرعي" : "Subtotal",
    shipping: locale === "ar" ? "الشحن" : "Shipping",
    tax: locale === "ar" ? "الضريبة" : "Tax",
    total: locale === "ar" ? "المجموع" : "Total",
    free: locale === "ar" ? "مجاني" : "Free",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      dispatch({ type: "CLEAR_CART" })
      alert(locale === "ar" ? "تم تأكيد طلبك بنجاح!" : "Order placed successfully!")
    }, 2000)
  }

  const tax = state.total * 0.1 // 10% tax
  const finalTotal = state.total + tax

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-6 lg:hidden">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={`${item.product.id}-${item.selectedColor}`} className="flex justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name[locale as keyof typeof item.product.name]}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t.subtotal}</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t.shipping}</span>
              <span>{t.free}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t.tax}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>{t.total}</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          {t.shippingInfo}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">{t.firstName}</Label>
            <Input id="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">{t.lastName}</Label>
            <Input id="lastName" required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="phone">{t.phone}</Label>
            <Input id="phone" type="tel" required />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="address">{t.address}</Label>
            <Input id="address" required />
          </div>
          <div>
            <Label htmlFor="city">{t.city}</Label>
            <Input id="city" required />
          </div>
          <div>
            <Label htmlFor="postalCode">{t.postalCode}</Label>
            <Input id="postalCode" required />
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          {t.paymentInfo}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="cardNumber">{t.cardNumber}</Label>
            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">{t.expiryDate}</Label>
              <Input id="expiryDate" placeholder="MM/YY" required />
            </div>
            <div>
              <Label htmlFor="cvv">{t.cvv}</Label>
              <Input id="cvv" placeholder="123" required />
            </div>
          </div>
          <div>
            <Label htmlFor="cardholderName">{t.cardholderName}</Label>
            <Input id="cardholderName" required />
          </div>
        </div>
      </div>

      {/* Desktop Order Summary */}
      <div className="hidden lg:block bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={`${item.product.id}-${item.selectedColor}`} className="flex justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name[locale as keyof typeof item.product.name]}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t.subtotal}</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t.shipping}</span>
              <span>{t.free}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t.tax}</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>{t.total}</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isProcessing || state.items.length === 0}>
        {isProcessing ? t.processing : t.placeOrder}
      </Button>
    </form>
  )
}

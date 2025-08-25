"use client"

import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface CartDrawerProps {
  locale: string
}

export function CartDrawer({ locale }: CartDrawerProps) {
  const { state, dispatch } = useCart()
  const isRTL = locale === "ar"

  const t = {
    cart: locale === "ar" ? "السلة" : "Cart",
    emptyCart: locale === "ar" ? "السلة فارغة" : "Your cart is empty",
    continueShopping: locale === "ar" ? "متابعة التسوق" : "Continue Shopping",
    subtotal: locale === "ar" ? "المجموع الفرعي" : "Subtotal",
    checkout: locale === "ar" ? "الدفع" : "Checkout",
    remove: locale === "ar" ? "إزالة" : "Remove",
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } })
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => dispatch({ type: "CLOSE_CART" })} />

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 ${isRTL ? "left-0" : "right-0"} h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              {t.cart} ({state.itemCount})
            </h2>
            <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "CLOSE_CART" })}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">{t.emptyCart}</p>
                <Button variant="outline" onClick={() => dispatch({ type: "CLOSE_CART" })}>
                  {t.continueShopping}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-3 p-3 border rounded-lg">
                    <img
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name[locale as keyof typeof item.product.name]}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">
                        {item.product.name[locale as keyof typeof item.product.name]}
                      </h3>
                      <p className="text-sm text-gray-500">${item.product.price}</p>
                      {item.selectedColor && (
                        <div className="flex items-center gap-1 mt-1">
                          <div
                            className="w-3 h-3 rounded-full border"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <span className="text-xs text-gray-500">{item.selectedColor}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 ml-auto"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{t.subtotal}</span>
                <span className="font-bold text-lg">${state.total.toFixed(2)}</span>
              </div>
              <Link href={`/${locale}/checkout`} className="block">
                <Button className="w-full" onClick={() => dispatch({ type: "CLOSE_CART" })}>
                  {t.checkout}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

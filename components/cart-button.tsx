"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface CartButtonProps {
  locale: string
}

export function CartButton({ locale }: CartButtonProps) {
  const { state, dispatch } = useCart()

  return (
    <Button variant="outline" size="sm" onClick={() => dispatch({ type: "TOGGLE_CART" })} className="relative">
      <ShoppingCart className="w-4 h-4" />
      {state.itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {state.itemCount}
        </span>
      )}
    </Button>
  )
}

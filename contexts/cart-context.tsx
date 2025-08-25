"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "@/lib/products"

interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number; selectedColor?: string } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1, selectedColor } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor,
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        newItems = [...state.items, { product, quantity, selectedColor }]
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount, isOpen: true }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.product.id !== action.payload.productId)
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { productId } })
      }

      const newItems = state.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0, itemCount: 0 }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    case "LOAD_CART": {
      const items = action.payload
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
      return { ...state, items, total, itemCount }
    }

    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("paint-store-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("paint-store-cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

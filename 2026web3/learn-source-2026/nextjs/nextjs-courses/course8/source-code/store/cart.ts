// store/cart.ts
import { create } from 'zustand'

// 定义 Store
type CartItem = Record<string, unknown>

type CartStore = {
  items: CartItem[]
  count: number
  addItem: (product: CartItem) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  count: 0,
  addItem: (product: CartItem) => set((state) => ({
    items: [...state.items, product],
    count: state.count + 1,
  })),
  clearCart: () => set({ items: [], count: 0 }),
}))

//@ts-nocheck

import { Product, Restaurant } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface OrderAppState {
  selectedRestaurant: Restaurant | null
  cart: Product[]
  selectRestaurant: (restaurant: Restaurant|null) => void
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
  discount: number,
  setDiscount: (discount: number) => void
}

const store = (
  set: (arg0: {
    (state: any): { cart: any[] }
    (state: any): {
      selectedRestaurant: Restaurant // import { persist, createJSONStorage } from 'zustand/middleware'
    }
  }) => any
) => ({
  selectedRestaurant: null,
  discount: 1,
  setDiscount: (discount: number) => set({ discount }),
  cart: [],
  addToCart: (product: Product) =>
    set((state: { cart: any }) => ({ cart: [...state.cart, product] })),
  removeFromCart: (product: Product) => {
    set((state: { cart: any }) => {
      const newCart = [...state.cart]
      const productIndex = newCart.findIndex(
        (item: { id: any }) => item.id === product.id
      )
      newCart.splice(productIndex, 1)
      return { cart: newCart }
    })
  },
  clearCart: () => set((state: { cart: any[] }) => ({ cart: [] })),
  selectRestaurant: (restaurant: Restaurant) =>
    set((state: any) => ({ selectedRestaurant: restaurant })),
})

// Enable devtools and persist the store
export const useOrderAppStore = create<OrderAppState>(
  devtools(
    persist(store, {
      name: 'order-app-store', // unique name for storage
      getStorage: () => localStorage, // change according to your storage option
    }),
    'order-app-store' // unique name for devtools
  )
)

// import { Product, Restaurant } from '@/types'
// import { create } from 'zustand'
// import { persist, createJSONStorage } from 'zustand/middleware'

// interface OrderAppState {
//   selectedRestaraunt: Restaurant | null
//   cart: Product[]
//   selectRestaraunt: (restaraunt: Restaurant) => void
//   addToCart: (product: Product) => void
// }

// export const useOrderAppStore = create<OrderAppState>(
//   (set) => ({
//   selectedRestaraunt: null,
//   cart: [],
//   addToCart: (product: Product) =>
//     set((state) => ({ cart: [...state.cart, product] })),
//   selectRestaraunt: (restaraunt: Restaurant) =>
//     set((state) => ({ selectedRestaraunt: restaraunt })),
// }))

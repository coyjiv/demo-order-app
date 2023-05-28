import { Product, Restaurant } from '@/types'
import { create } from 'zustand'

interface OrderAppState {
  selectedRestaraunt: Restaurant | null
  cart: Product[]
  selectRestaraunt: (restaraunt: Restaurant) => void
}

export const useOrderAppStore = create<OrderAppState>((set) => ({
  selectedRestaraunt: null,
  cart: [],
  selectRestaraunt: (restaraunt: Restaurant) =>
    set((state) => ({ selectedRestaraunt: restaraunt })),
}))

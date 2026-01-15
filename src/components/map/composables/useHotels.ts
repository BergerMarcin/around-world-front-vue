import { computed } from 'vue'
import type { Ref } from 'vue'
import { useCartStore, useHotelsStore } from '@/stores'
import { useLogger } from '@/utils/logger'
import type { Hotel } from '@/types/global.types'

let hotels: Ref<Hotel[]>

export function useHotels(): {
  hotels: Ref<Hotel[]>
  fetchHotelsToStore: () => Promise<void>
  addHotelToCart: (hotel: Hotel) => void
  isHotelInCart: (hotel: Hotel) => boolean
} {
  const hotelsStore = useHotelsStore()
  const cartStore = useCartStore()
  const { devLog } = useLogger()

  hotels = computed(() => hotelsStore.hotels)

  function addHotelToCart(hotel: Hotel): void {
    cartStore.addToCart(hotel)
    devLog(`Hotel "${hotel.name}" added to cart from popup.`)
  }

  function isHotelInCart(hotel: Hotel): boolean {
    return cartStore.isCartItemInCart(hotel)
  }

  return {
    hotels,
    fetchHotelsToStore: hotelsStore.fetchHotels,
    addHotelToCart,
    isHotelInCart,
  }
}

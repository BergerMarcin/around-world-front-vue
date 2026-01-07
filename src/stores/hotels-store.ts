import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import { ProviderKey } from '@/types/global.types'
import { useNotification } from '@/components/notification/useNotification'
import type { Hotel } from '@/types/global.types'
import type { BackendApiService } from '@/api/types/backend-api-service.types'
import { isHotelsTypeguard } from '@/types/global.typeguard'
import { validateHotels } from './utils/hotels-validate'

export const useHotelsStore = defineStore('hotels', () => {
  const { showNotification } = useNotification()
  const hotels = ref<Hotel[]>([])

  const backendApiService = inject<BackendApiService>(ProviderKey.BACKEND_API_SERVICE)

  const fetchHotels = async () => {
    try {
      const hotelsResponse = await backendApiService!.hotelsService.hotels({ typeguard: isHotelsTypeguard })
      hotels.value = validateHotels(hotelsResponse)
      if (!hotels.value.length) {
        showNotification('No valid hotels data available.', { notificationType: 'warning', timer: 3000 })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showNotification('Could not load hotels. Please try again later', { notificationType: 'error', timer: 3000 })
    }
  }

  return { hotels, fetchHotels }
})

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<Hotel[]>([])

  function addToCart(hotel: Hotel): void {
    if (!cartItems.value.find((item) => item.sku === hotel.sku)) {
      cartItems.value.push(hotel)
    }
  }

  function removeFromCart(hotelSku: string): void {
    cartItems.value = cartItems.value.filter((item) => item.sku !== hotelSku)
  }

  function hasCartHotel(hotelSku: string): boolean {
    return cartItems.value.some((item) => item.sku === hotelSku)
  }

  return { cartItems, addToCart, removeFromCart, hasCartHotel }
})

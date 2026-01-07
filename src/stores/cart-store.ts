import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hotel } from '@/types/global.types'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<Hotel[]>([])

  const areHotelsTheSame =
    (hotelA: Hotel) =>
    (hotelB: Hotel): boolean => {
      return hotelA.sku === hotelB.sku
    }
  const areHotelsDifferent =
    (hotelA: Hotel) =>
    (hotelB: Hotel): boolean => {
      return hotelA.sku !== hotelB.sku
    }

  function addToCart(hotel: Hotel): void {
    if (!cartItems.value.find(areHotelsTheSame(hotel))) {
      cartItems.value.push(hotel)
    }
  }

  function removeFromCart(hotel: Hotel): void {
    cartItems.value = cartItems.value.filter(areHotelsDifferent(hotel))
  }

  function isHotelInCart(hotel: Hotel): boolean {
    return cartItems.value.some(areHotelsTheSame(hotel))
  }

  return { cartItems, addToCart, removeFromCart, isHotelInCart }
})

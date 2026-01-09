import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CartItem } from '@/types/global.types'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  const areCartItemsTheSame =
    (hotelA: CartItem) =>
    (hotelB: CartItem): boolean => {
      return hotelA.sku === hotelB.sku
    }
  const areCartItemsDifferent =
    (hotelA: CartItem) =>
    (hotelB: CartItem): boolean => {
      return hotelA.sku !== hotelB.sku
    }

  function addToCart(hotel: CartItem): void {
    if (!cartItems.value.find(areCartItemsTheSame(hotel))) {
      cartItems.value.push(hotel)
    }
  }

  function removeFromCart(cartItem: CartItem): void {
    cartItems.value = cartItems.value.filter(areCartItemsDifferent(cartItem))
  }

  function hasCartItems(): boolean {
    return Boolean(cartItems.value.length)
  }

  function isCartItemInCart(cartItem: CartItem): boolean {
    return cartItems.value.some(areCartItemsTheSame(cartItem))
  }

  return { cartItems, addToCart, removeFromCart, hasCartItems, isCartItemInCart }
})

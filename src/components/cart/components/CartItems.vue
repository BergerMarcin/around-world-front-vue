<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/button/BaseButton.vue'
import { useCartStore } from '@/stores/cart-store'
import { useCartModal } from '@/components/cart/composables/useCartModal'
import type { CartItem } from '@/types/global.types'

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
const { hasCartItems } = cartStore

const {
  isAnySelectedCartItem,
  isCartItemSelected,
  removeFromCartSelectedCartItems,
  toggleOpenCartModal,
  toggleSelectionCartItem,
} = useCartModal()

const toggleSelectionButtonText = (cartItem: CartItem) =>
  computed(() => (isCartItemSelected(cartItem) ? 'Restore' : 'Delete'))
</script>

<template>
  <div class="cart-items">
    <h2 class="cart-items__header">Your Cart</h2>
    <p v-if="!hasCartItems()" class="cart-items__empty-message">Add your holidays to the cart to see them here.</p>
    <template v-else>
      <ul class="cart-items__list">
        <li v-for="hotel in cartItems" :key="hotel.sku" class="cart-item">
          <span>{{ hotel.title }} {{ hotel.location_country }} {{ hotel.location_region }}</span>
          <BaseButton variant="tertiary" @click="toggleSelectionCartItem(hotel)">
            {{ toggleSelectionButtonText(hotel) }}
          </BaseButton>
        </li>
      </ul>
      <div class="cart-items__buttons">
        <BaseButton variant="tertiary" @click="toggleOpenCartModal">Discard</BaseButton>
        <BaseButton :disabled="!isAnySelectedCartItem" variant="tertiary" @click="removeFromCartSelectedCartItems">
          Remove Selected
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped></style>

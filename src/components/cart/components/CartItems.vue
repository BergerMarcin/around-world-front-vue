<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CartItemDetails from './CartItemDetails.vue'
import BaseButton from '@/components-ui/button/BaseButton.vue'
import { useCartStore } from '@/stores/cart-store'
import { useCartModal } from '@/components/cart/composables/useCartModal'

const cartStore = useCartStore()
const { cartItems } = storeToRefs(cartStore)
const { hasCartItems } = cartStore

const { isAnySelectedCartItem, removeFromCartSelectedCartItems, toggleOpenCartModal } = useCartModal()
</script>

<template>
  <div class="cart-items">
    <h1 class="cart-items__header">Your Cart</h1>
    <p v-if="!hasCartItems()" class="cart-items__empty-message">Add your holidays to the cart to see them here.</p>
    <template v-else>
      <ul class="cart-items-list">
        <li v-for="hotel in cartItems" :key="hotel.sku" class="cart-items-list__item">
          <CartItemDetails :hotel="hotel" />
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

<style lang="scss" scoped>
.cart-items {
  padding: 1.25rem;

  &__header {
    color: var(--aw-color-text-header);
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  &__empty-message {
    text-align: center;
    font-style: italic;
  }

  &__buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.75rem;
  }
}

.cart-items-list {
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 1.25rem;
  list-style: none;

  @media (min-width: 660px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
    width: fit-content;
    margin: 0 auto;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-button {
      margin-top: 0.25rem;
    }
  }
}
</style>

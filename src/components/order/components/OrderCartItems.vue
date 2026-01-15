<script setup lang="ts">
import BaseButton from '@/components-ui/button/BaseButton.vue'
import { useHotelModal } from '@/components/hotel-modal/composables/useHotelModal'
import type { CartItem } from '@/types/global.types'

defineProps<{
  cartItems: CartItem[]
  orderAll: () => void
}>()

const { openHotelModal } = useHotelModal()

const location = (item: CartItem): string => `${item.location.country}, ${item.location.region}`
</script>

<template>
  <div class="order-cart-items">
    <h1 class="order-cart-items__header">Your Order</h1>
    <p v-if="!cartItems.length" class="order-cart-items__empty-message">
      Add your holidays to the cart to see them here.
    </p>
    <template v-else>
      <table class="order-cart-items__table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.sku" @click="openHotelModal(item)">
            <td>
              <img :src="item.image.url" :alt="item.image.alt" class="order-cart-items__image" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ location(item) }}</td>
            <td>{{ item.price }} {{ item.currency }}</td>
          </tr>
        </tbody>
      </table>
      <div class="order-cart-items__actions">
        <BaseButton variant="primary" @click="orderAll">Order All</BaseButton>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.order-cart-items {
  padding: 1.25rem;
  width: 100%;

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

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    @media (min-width: 660px) {
      font-size: 1rem;
    }

    tbody tr {
      cursor: pointer;
      &:hover {
        transition: background-color var(--aw-transition);
        background-color: var(--aw-color-table-row-bg-hover);
        transform: translateX(-1px) translateY(-1px);
      }
    }

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid var(--aw-color-border-light);
    }

    th {
      font-weight: 600;
      background-color: var(--aw-color-table-header-bg);
    }

    td {
      word-break: break-word;
    }
  }

  &__image {
    width: 100px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    @media (min-width: 660px) {
      width: 150px;
      height: 90px;
    }
    @media (min-width: 1024px) {
      width: 170px;
      height: 100px;
    }
  }

  &__actions {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-top: 16px;
  }

  &::-webkit-scrollbar {
    width: 6px;
    &-track {
      background: var(--aw-color-scrollbar-track);
      border-radius: 3px;
    }
    &-thumb {
      background: var(--aw-color-scrollbar-thumb);
      border-radius: 3px;
      &:hover {
        background: var(--aw-color-scrollbar-thumb-hover);
      }
    }
  }
}
</style>

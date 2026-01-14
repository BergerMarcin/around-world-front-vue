<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/components-ui/button/BaseButton.vue'
import { useHotelModal } from '@/components/hotel-modal/composables/useHotelModal'
import { useCartModal } from '@/components/cart/composables/useCartModal'
import { imageUrlFromHotel, rateStandardized } from '@/utils/hotel-details.utils'
import type { CartItem } from '@/types/global.types'

const props = defineProps<{
  hotel: CartItem
}>()

const { openHotelModal } = useHotelModal()
const { isCartItemSelected, toggleCartItemSelection } = useCartModal()

const toggleSelectionButtonText = computed(() => (isCartItemSelected(props.hotel) ? 'Restore' : 'Delete'))

const imageUrl = imageUrlFromHotel(props.hotel)
const rate = rateStandardized(props.hotel)
</script>

<template>
  <div class="cart-item">
    <div class="cart-item__image-container">
      <img :src="imageUrl" :alt="hotel.title" class="cart-item__image" />
      <span v-if="rate" class="cart-item__rate">⭐ {{ rate }}</span>
    </div>
    <div class="cart-item__content">
      <div class="cart-item-head">
        <div class="cart-item-head__title-price">
          <h3 class="cart-item-head__title">{{ hotel.title }}</h3>
          <div class="cart-item-head__price">
            <span class="cart-item-head__price-value">{{ hotel.price }}</span>
            <span class="cart-item-head__price-currency">{{ hotel.currency }}</span>
          </div>
        </div>
        <div class="cart-item-head__buttons">
          <BaseButton @click="openHotelModal(hotel)">
            <span class="cart-item-head__buttons-details">See more</span>
          </BaseButton>
          <BaseButton variant="tertiary" @click="toggleCartItemSelection(hotel)">
            <span class="cart-item-head__buttons-delete">{{ toggleSelectionButtonText }}</span>
          </BaseButton>
        </div>
      </div>
      <p class="cart-item-description">{{ hotel.description_general }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-item {
  width: 250px;
  max-height: 300px;
  border: 2px solid var(--aw-color-border-light);
  border-radius: 8px;
  box-shadow: 0 0 8px var(--aw-color-box-shadow);
  background: var(--aw-color-background-card);
  overflow-y: auto;

  &__image-container {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__rate {
    position: absolute;
    top: 8px;
    left: 8px;
    background: var(--aw-color-overlay-dark);
    color: var(--aw-color-text-white);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  &__content {
    padding: 12px;

    & .cart-item-head {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;

      &__title {
        margin: 0 0 8px 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--aw-color-text-header);
        line-height: 1.3;
      }

      &__price {
        display: flex;
        align-items: baseline;
        gap: 0.25rem;
        margin-bottom: 8px;

        &-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--aw-color-primary-1);
        }

        &-currency {
          font-size: 0.85rem;
          color: var(--aw-color-text-muted);
        }
      }

      &__buttons {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 8px;

        & .base-button {
          padding: 6.22px 12px;
        }

        &-details,
        &-delete {
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }
      }
    }

    & .cart-item-description {
      margin: 0;
      font-size: 0.85rem;
      color: var(--aw-color-text-regular);
      line-height: 1.5;
    }
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

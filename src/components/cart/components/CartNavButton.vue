<script setup lang="ts">
import { useCartModal } from '../composables/useCartModal'

const props = defineProps<{
  disabled: boolean
}>()

const { isCartModalOpen, toggleOpenCartModal } = useCartModal()
</script>

<template>
  <button
    :disabled="props.disabled || isCartModalOpen"
    :class="['cart-nav-button', { 'cart-nav-button--modal-opened': isCartModalOpen }]"
    @click="toggleOpenCartModal"
  >
    Cart
  </button>
</template>

<style lang="scss" scoped>
.cart-nav-button {
  color: var(--aw-color-link-text);
  font-weight: 500;
  background-color: var(--aw-color-link-bg);
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--aw-color-link-text-hover);
    background: var(--aw-color-link-bg-hover);
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    color: var(--aw-color-text-regular);
    background: transparent;
    cursor: default;
  }

  &--modal-opened {
    text-decoration: underline;
  }
}
</style>

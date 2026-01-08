<script setup lang="ts">
import { useCartModal } from '../composables/useCartModal'
import BaseModal from '@/components/modal/BaseModal.vue'
import CartItems from './CartItems.vue'

const { isCartModalOpen, closeCartModal } = useCartModal()
</script>

<template>
  <BaseModal :is-open="isCartModalOpen" @close="closeCartModal">
    <CartItems />
  </BaseModal>
</template>

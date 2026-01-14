<script setup lang="ts">
import { useOrderModal } from '../composables/useOrderModal'
import BaseModal from '@/components-ui/modal/BaseModal.vue'
import OrderCartItems from './OrderCartItems.vue'

const { isOrderModalOpen, closeOrderModal, cartItemsToBeOrdered, orderAll } = useOrderModal()
</script>

<template>
  <BaseModal :is-open="isOrderModalOpen" @close="closeOrderModal">
    <OrderCartItems v-if="cartItemsToBeOrdered" :cartItems="cartItemsToBeOrdered" :orderAll="orderAll" />
  </BaseModal>
</template>

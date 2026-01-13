<script setup lang="ts">
import { useHotelModal } from '../composables/useHotelModal'
import BaseModal from '@/components-ui/modal/BaseModal.vue'
import HotelDetailContent from './HotelDetailContent.vue'

const { addToCart, closeHotelModal, hotelForModal, isHotelModalOpen, isHotelForModalInCart } = useHotelModal()
</script>

<template>
  <BaseModal :is-open="isHotelModalOpen" @close="closeHotelModal">
    <HotelDetailContent
      v-if="hotelForModal"
      :hotel="hotelForModal"
      :isHotelInCart="isHotelForModalInCart"
      @add-to-cart="addToCart"
    />
  </BaseModal>
</template>

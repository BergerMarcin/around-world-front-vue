<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMap } from '../composables/useMap'
import { useHotels } from '../composables/useHotels'
import { useHotelModal } from '../composables/useHotelModal'
import BaseModal from '@/components/modal/BaseModal.vue'
import HotelDetailContent from '@/components/map/components/HotelDetailContent.vue'

const { bindHotelsMarkers, unbindHotelsMarkers, map, mountMap, unmountMap } = useMap({
  center: [51.505, -0.09],
})
const { fetchHotelsToStore } = useHotels()
const {
  hotelForModal,
  isHotelModalOpen,
  closeHotelModal,
  addToCart,
  isHotelForModalInCart,
} = useHotelModal()

onMounted(async () => {
  mountMap()
  await fetchHotelsToStore()
  bindHotelsMarkers(map)
})

onBeforeUnmount(() => {
  unbindHotelsMarkers(map)
  unmountMap()
})
</script>

<template>
  <div id="mapContainer"></div>
  <!-- TODO: Create new HotelModal component and move below and useHotels composable -->
  <BaseModal :is-open="isHotelModalOpen" @close="closeHotelModal">
    <HotelDetailContent
      v-if="hotelForModal"
      :hotel="hotelForModal"
      :isHotelInCart="isHotelForModalInCart"
      @add-to-cart="addToCart"
    />
  </BaseModal>
</template>

<style scoped>
#mapContainer {
  width: calc(100vw - 1rem - 2px);
  height: calc(100vh - 3rem - 2px);
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMap } from '../composables/useMap'
import { useHotels } from '../composables/useHotels'
import BaseModal from '@/components/modal/BaseModal.vue'
import HotelDetailContent from '@/components/map/components/HotelDetailContent.vue'

const { map, mountMap, unmountMap } = useMap({ center: [51.505, -0.09] })
const {
  fetchHotelsToStore,
  bindHotelsMarkers,
  unbindHotelsMarkers,
  selectedHotel,
  isHotelModalOpen,
  closeHotelModal,
  addToCart,
  isSelectedHotelInCart,
} = useHotels()

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
  <BaseModal :is-open="isHotelModalOpen" @close="closeHotelModal">
    <HotelDetailContent
      v-if="selectedHotel"
      :hotel="selectedHotel"
      :isHotelInCart="isSelectedHotelInCart"
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

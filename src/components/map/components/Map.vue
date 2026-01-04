<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMap } from '../composables/useMap'
import { useHotels } from '../composables/useHotels'
import { useHotelsStore } from '@/stores/hotels-store'
import BaseModal from '@/components/modal/BaseModal.vue'
import HotelDetailContent from '@/components/map/components/HotelDetailContent.vue'

const { map, mountMap, unmountMap } = useMap({ center: [51.505, -0.09] })
const { bindHotelsMarkers, unbindHotelsMarkers, selectedHotel, isModalOpen, closeModal } = useHotels()
const hotelsStore = useHotelsStore()

// TODO: Fix zoom on wheel-moving. Fix moving map on left-key-mouse-down and moving mouse

onMounted(async () => {
  mountMap()
  await hotelsStore.fetchHotels()
  bindHotelsMarkers(map)
})

onBeforeUnmount(() => {
  unbindHotelsMarkers(map)
  unmountMap()
})
</script>

<template>
  <BaseModal :is-open="isModalOpen" @close="closeModal">
    <HotelDetailContent v-if="selectedHotel" :hotel="selectedHotel" />
  </BaseModal>
  <div id="mapContainer"></div>
</template>

<style scoped>
#mapContainer {
  width: calc(100vw - 1rem - 2px);
  height: calc(100vh - 3rem - 2px);
}
</style>

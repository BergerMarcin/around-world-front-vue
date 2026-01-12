<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMap } from '../composables/useMap'
import { useHotels } from '../composables/useHotels'
import HotelModal from '@/components/hotel-modal/components/HotelModal.vue'

const { bindHotelsMarkers, unbindHotelsMarkers, map, mountMap, unmountMap } = useMap({
  center: [51.505, -0.09],
})
const { fetchHotelsToStore } = useHotels()

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

  <HotelModal />
</template>

<style scoped>
#mapContainer {
  width: calc(100vw - 1rem - 2px);
  height: calc(100vh - 3rem - 2px);
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMap } from '../composables/useMap'
import { useHotels } from '../composables/useHotels'
import { useHotelsStore } from '@/stores/hotels-store'

const { map, mountMap, unmountMap } = useMap({ center: [51.505, -0.09] })
const { bindHotelsMarkers, unbindHotelsMarkers } = useHotels()
const hotelsStore = useHotelsStore()

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
  <div id="mapContainer"></div>
</template>

<style scoped>
#mapContainer {
  width: calc(100vw - 1rem - 2px);
  height: calc(100vh - 3rem - 2px);
}
</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { useMap } from '../composables/map'
import { useHotels } from '../composables/hotels'

const { map, mountMap, unmountMap } = useMap({ center: [51.505, -0.09], zoom: 13 })
const { hotels, bindHotelsMarkers, unbindHotelsMarkers } = useHotels()

onMounted(() => {
  mountMap()
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

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, toRaw } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
const map = ref<L.Map>()

onMounted(() => {
  map.value = L.map('mapContainer').setView([51.505, -0.09], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(toRaw(map.value)!)

  L.marker([51.5, -0.09])
    .addTo(toRaw(map.value)!)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup()
})

onBeforeUnmount(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<template>
  <main>
    <div id="mapContainer"></div>
  </main>
</template>

<style scoped>
#mapContainer {
  width: calc(100vw - 1rem - 2px);
  height: calc(100vh - 3rem - 2px);
}
</style>

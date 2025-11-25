<script setup lang="ts">
import { onMounted, toRaw } from 'vue'
import Leaflet from 'leaflet'
import { useMap } from '../composables/useMap'

const map = useMap({ center: [51.505, 19] })

onMounted(() => {
  Leaflet.marker([51.5, -0.09])
    .addTo(toRaw(map.value)!)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .on('mouseover', function (this: Leaflet.Marker) {
      this.openPopup()
      console.log('mouseover')
    })
    .on('mouseout', function (this: Leaflet.Marker) {
      this.closePopup()
      console.log('mouseout')
    })
    .on('touchstart', function (this: Leaflet.Marker) {
      this.openPopup()
      console.log('touchstart')
    })
    .on('touchend', function (this: Leaflet.Marker) {
      this.closePopup()
      console.log('touchend')
    })
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

<script setup lang="ts">
// TODO: Remove later on as `vue-leaflet` adding another layer of complexity
import { ref, useTemplateRef, watch } from 'vue'
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { useHotels } from '../composables/hotels'
import { useLogger } from '@/utils/logger'

/* NOTE:  Required here (instead onMounted) calculation `minZoom` to set `zoom` initial value.
          If calculated onMounted then `zoom` set value with `minZoom` is not taking by `LMap` component.
          Required onResize event to recalculate minZoom/zoom.
          The minZoom calculation should be moved to a composable or utility function */
const mapContainer = useTemplateRef<HTMLInputElement>('mapContainer')
const mapWidth = mapContainer.value?.clientWidth || window.innerWidth
const mapHeight = mapContainer.value?.clientHeight || window.innerHeight
const minZoomWidth = Math.ceil(Math.log2(mapWidth / 256))
const minZoomHeight = Math.ceil(Math.log2(mapHeight / 256))
const minZoom = Math.max(minZoomWidth, minZoomHeight)
console.log(
  'minZoom:',
  minZoom,
  'minZoomWidth:',
  minZoomWidth,
  'minZoomHeight:',
  minZoomHeight,
  'mapWidth:',
  mapWidth,
  'mapHeight:',
  mapHeight,
)
const zoom = ref<number>(minZoom)

const { hotels } = useHotels()

const { devLog } = useLogger()

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

function openClosePopupHandler(event: any, open: boolean) {
  if (isTouchDevice) {
    return
  }
  const marker = event.target
  if (open && marker.openPopup) {
    marker.openPopup()
  }
  if (!open && marker.closePopup) {
    marker.closePopup()
  }
}
function openPopup(event: any) {
  devLog('Opening popup')
  openClosePopupHandler(event, true)
}
function closePopup(event: any) {
  devLog('Closing popup')
  openClosePopupHandler(event, false)
}

watch(
  zoom,
  (newZoom) => {
    console.log('Current zoom:', newZoom)
  },
  { immediate: true },
)
</script>

/* zoom tiles count (tiles 256x256) [[zoom, tilesCount]]: [0, 1], [1, 2], [2, 4], [3, 8], [4, 16], [5, 32], ...] */
<template>
  <div id="mapContainer" ref="mapContainer">
    <LMap
      ref="map"
      v-model:zoom="zoom"
      :center="[51.505, -0.09]"
      :max-bounds="[
        [-90, -180],
        [90, 180],
      ]"
      :min-zoom="minZoom"
      :options="{ attributionControl: false }"
    >
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap">
      </LTileLayer>
      <LMarker
        v-for="hotel in hotels"
        :key="hotel.name"
        :lat-lng="hotel.localisation"
        @mouseover="openPopup"
        @mouseout="closePopup"
      >
        <LPopup>
          <div>
            <h3>{{ hotel.name }}</h3>
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<style scoped>
#mapContainer {
  width: calc(100vw - 1rem - 2px);
  height: calc(100vh - 3rem - 2px);
}
</style>

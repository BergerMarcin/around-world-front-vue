import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import Leaflet from 'leaflet'
import type { LatLngTuple, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface UseMapOptions {
  containerId?: string
  center?: LatLngTuple
  zoom?: number
}

export function useMap(options?: UseMapOptions): Ref<Map | undefined> {
  const { containerId, center, zoom } = {
    containerId: 'mapContainer',
    center: [51.505, -0.09] as LatLngTuple,
    zoom: 3,
    ...options,
  }

  const map = ref<Map | undefined>()

  onMounted(() => {
    map.value = Leaflet.map(containerId).setView(center, zoom)

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value)
  })

  onBeforeUnmount(() => {
    if (map.value) {
      map.value.remove()
    }
  })

  return map
}

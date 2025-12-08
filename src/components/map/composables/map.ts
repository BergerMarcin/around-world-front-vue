import { ref } from 'vue'
import type { Ref } from 'vue'

import Leaflet from 'leaflet'
import type { LatLngTuple, Map, MapOptions } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface UseMapOptions {
  containerId?: string
  center?: LatLngTuple
  zoom?: number
}

export function useMap(options?: UseMapOptions): {
  map: Ref<Map | undefined>
  mountMap: () => void
  unmountMap: () => void
} {
  const { containerId, center, zoom } = {
    containerId: 'mapContainer',
    center: [51.505, -0.09] as LatLngTuple,
    zoom: 3,
    ...options,
  }

  const map = ref<Map | undefined>()

  function mountMap(): void {
    const mapOptions: MapOptions = {
      attributionControl: false,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
    }
    map.value = Leaflet.map(containerId, mapOptions).setView(center, zoom)

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value)
  }

  function unmountMap(): void {
    if (map.value) {
      map.value.remove()
    }
  }

  return { map, mountMap, unmountMap }
}

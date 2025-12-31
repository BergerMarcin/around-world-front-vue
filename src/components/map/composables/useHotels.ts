import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import Leaflet from 'leaflet'
import type { LatLngTuple, Map } from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { LogLevel, useLogger } from '@/utils/logger'
import { useHotelsStore } from '@/stores/hotels-store'
import type { Hotel } from '@/types/global.types'

export function useHotels(): {
  hotels: Ref<Hotel[]>
  bindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
  unbindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
} {
  const { devLog } = useLogger()
  const hotelsStore = useHotelsStore()

  const hotels: Ref<Hotel[]> = computed(() => hotelsStore.hotels)
  const markerClusterGroup: Ref<Leaflet.MarkerClusterGroup | null> = ref(null)

  function bindHotelsMarkers(mapRef: Ref<Map | undefined>): void {
    if (!mapRef.value) {
      return
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Create a marker cluster group
    markerClusterGroup.value = Leaflet.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      disableClusteringAtZoom: 18,
    })

    hotels.value.forEach((hotel) => {
      const hotelLatLng: LatLngTuple = [hotel.location_coordinates_latitude, hotel.location_coordinates_longitude]
      const marker = Leaflet.marker(hotelLatLng).bindPopup(
        `<h3>Hotel</h3><p>This is a hotel marker ${hotel.title}.</p>`,
      )
      if (!isTouchDevice) {
        marker
          .on('mouseover', function (this: Leaflet.Marker) {
            this.openPopup()
            devLog(`Mouseover hotel marker ${hotel.title}`)
          })
          .on('mouseout', function (this: Leaflet.Marker) {
            const popup = this.getPopup()
            const popupElem = popup?.getElement() || undefined
            // Delay close to allow hover over popup
            setTimeout(() => {
              const isHoveringPopup = !!popupElem && popupElem.matches(':hover')
              if (!isHoveringPopup) {
                this.closePopup()
                devLog(LogLevel.warn, `Mouseout hotel marker ${hotel.title} (closed after 300ms)`)
              } else {
                // If currently hovering popup, close when user leaves the popup element
                devLog(`Mouseout ignored: hovering popup for ${hotel.title}`)
                if (popupElem && !popupElem.dataset.leaveBound) {
                  popupElem.dataset.leaveBound = 'true'
                  const onLeave = () => {
                    delete popupElem.dataset.leaveBound
                    this.closePopup()
                    devLog(LogLevel.error, `Popup mouseleave -> closed ${hotel.title}`)
                  }
                  popupElem.addEventListener('mouseleave', onLeave, { once: true })
                }
              }
            }, 300)
          })
      }
      markerClusterGroup.value!.addLayer(marker)
    })
    mapRef.value.addLayer(markerClusterGroup.value)
  }

  function unbindHotelsMarkers(mapRef: Ref<Map | undefined>): void {
    if (markerClusterGroup.value) {
      markerClusterGroup.value.clearLayers()
      mapRef.value?.removeLayer(markerClusterGroup.value)
      markerClusterGroup.value = null
    }
  }

  return { hotels, bindHotelsMarkers, unbindHotelsMarkers }
}

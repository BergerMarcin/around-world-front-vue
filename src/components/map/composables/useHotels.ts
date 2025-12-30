import { computed } from 'vue'
import type { Ref } from 'vue'
import Leaflet from 'leaflet'
import type { LatLngTuple, Map } from 'leaflet'
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

  function bindHotelsMarkers(mapRef: Ref<Map | undefined>): void {
    if (!mapRef.value) {
      return
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    hotels.value.forEach((hotel) => {
      const hotelLatLng: LatLngTuple = [hotel.location_coordinates_latitude, hotel.location_coordinates_longitude]
      const marker = Leaflet.marker(hotelLatLng)
        .addTo(mapRef.value!)
        .bindPopup(`<h3>Hotel</h3><p>This is a hotel marker ${hotel.title}.</p>`)
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
    })
  }

  function unbindHotelsMarkers(mapRef: Ref<Map | undefined>): void {
    mapRef.value?.eachLayer((layer) => {
      if (layer instanceof Leaflet.Marker) {
        mapRef.value?.removeLayer(layer)
      }
    })
  }

  return { hotels, bindHotelsMarkers, unbindHotelsMarkers }
}

import { ref, inject } from 'vue'
import type { Ref, ShallowRef } from 'vue'
import Leaflet from 'leaflet'
import type { LatLngTuple, Map } from 'leaflet'

export interface Hotel {
  localisation: LatLngTuple
  name: string
}

export function useHotels(initial?: Hotel[]): {
  hotels: Ref<Hotel[]>
  bindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
  unbindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
} {
  const logsContainer: Readonly<ShallowRef<HTMLElement | null>> | undefined = inject('logsContainer')

  const hotels: Ref<Hotel[]> = ref(
    initial || [
      { localisation: [51.5, -0.09], name: 'Hotel 1' },
      { localisation: [51.51, -0.1], name: 'Hotel 2' },
      { localisation: [51.49, -0.08], name: 'Hotel 3' },
    ],
  )

  function logHotelEvent(logText: string): void {
    console.log(logText)
    if (import.meta.env.DEV) {
      const el = logsContainer?.value
      if (el) {
        el.innerText += ` | ${logText}`
      }
    }
  }

  function bindHotelsMarkers(mapRef: Ref<Map | undefined>): void {
    if (!mapRef.value) {
      return
    }

    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    hotels.value.forEach((hotel) => {
      const marker = Leaflet.marker(hotel.localisation)
        .addTo(mapRef.value!)
        .bindPopup(`<h3>Hotel</h3><p>This is a hotel marker ${hotel.name}.</p>`)
      if (!isTouchDevice) {
        marker
          .on('mouseover', function (this: Leaflet.Marker) {
            this.openPopup()
            logHotelEvent(`Mouseover hotel marker ${hotel.name}`)
          })
          .on('mouseout', function (this: Leaflet.Marker) {
            const popup = this.getPopup()
            const el = popup?.getElement() || undefined
            // Delay close to allow hover over popup
            setTimeout(() => {
              const isHoveringPopup = !!el && el.matches(':hover')
              if (!isHoveringPopup) {
                (this as Leaflet.Marker).closePopup()
                logHotelEvent(`Mouseout hotel marker ${hotel.name} (closed after 300ms)`)
              } else {
                // If currently hovering popup, close when user leaves the popup element
                logHotelEvent(`Mouseout ignored: hovering popup for ${hotel.name}`)
                if (el && !el.dataset.leaveBound) {
                  el.dataset.leaveBound = 'true'
                  const onLeave = () => {
                    delete el.dataset.leaveBound
                    ;(this as Leaflet.Marker).closePopup()
                    logHotelEvent(`Popup mouseleave -> closed ${hotel.name}`)
                  }
                  el.addEventListener('mouseleave', onLeave, { once: true })
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

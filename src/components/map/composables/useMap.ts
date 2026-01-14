import { ref } from 'vue'
import type { Ref } from 'vue'

import Leaflet from 'leaflet'
import type { LatLngTuple, Map, MapOptions } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import '../styles/map-marker-popup.css'
import { useHotels } from './useHotels'
import { useHotelModal } from '../../hotel-modal/composables/useHotelModal'
import {
  addToCartOnAtcButtonClick,
  createHotelPopupContent,
  customMarkerIcon,
  openHotelModalOnMarkerClick,
  openHotelModalOnPopupClick,
  openOrClosePopupOnMarkerHover,
  updatePopupContentOnOpen,
} from '../utils/map.utils'

export interface UseMapOptions {
  containerId?: string
  center?: LatLngTuple
  zoom?: number
}

export function useMap(options?: UseMapOptions): {
  bindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
  unbindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
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
  const markerClusterGroup: Ref<Leaflet.MarkerClusterGroup | null> = ref(null)

  const { hotels, addHotelToCart, isHotelInCart } = useHotels()
  const { openHotelModal } = useHotelModal()

  function bindHotelsMarkers(mapRef: Ref<Map | undefined>): void {
    if (!mapRef.value) {
      return
    }

    markerClusterGroup.value = Leaflet.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: false,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 18,
    })

    const isTouchDevice: boolean = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    hotels.value.forEach((hotel) => {
      const hotelLatLng: LatLngTuple = [hotel.location_coordinates_latitude, hotel.location_coordinates_longitude]
      const marker = Leaflet.marker(hotelLatLng, { icon: customMarkerIcon }).bindPopup(
        createHotelPopupContent(hotel, isHotelInCart(hotel)),
        {
          maxWidth: 300,
          className: 'hotel-popup-wrapper',
          closeOnClick: false,
        },
      )
      updatePopupContentOnOpen({ marker, hotel, isHotelInCart })
      openHotelModalOnMarkerClick({
        marker,
        hotel,
        isTouchDevice,
        openHotelModal,
      })
      openOrClosePopupOnMarkerHover({ marker, isTouchDevice })
      openHotelModalOnPopupClick({ marker, hotel, openHotelModal })
      addToCartOnAtcButtonClick({ marker, hotel, addHotelToCart, isHotelInCart })
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

  return {
    bindHotelsMarkers,
    unbindHotelsMarkers,
    map,
    mountMap,
    unmountMap,
  }
}

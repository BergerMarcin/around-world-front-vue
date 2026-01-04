import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import Leaflet from 'leaflet'
import type { LatLngTuple, Map } from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import '../styles/map-marker.css'
import { useLogger } from '@/utils/logger'
import { useHotelsStore } from '@/stores/hotels-store'
import type { Hotel } from '@/types/global.types'
import {
  createHotelPopupContent,
  customIcon,
  modalOpenOnMarkerClick,
  popupClickListener,
  popupOpenOnMarkerHover,
} from '../utils/hotel-marker.utils.js'

export function useHotels(): {
  hotels: Ref<Hotel[]>
  selectedHotel: Ref<Hotel | null>
  isModalOpen: Ref<boolean>
  closeModal: () => void
  bindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
  unbindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
} {
  const { devLog } = useLogger()
  const hotelsStore = useHotelsStore()

  const hotels: Ref<Hotel[]> = computed(() => hotelsStore.hotels)
  const markerClusterGroup: Ref<Leaflet.MarkerClusterGroup | null> = ref(null)
  const selectedHotel: Ref<Hotel | null> = ref(null)
  const isModalOpen = ref(false)

  function openModalWithHotel(hotel: Hotel) {
    isModalOpen.value = true
    selectedHotel.value = hotel
  }

  function closeModal() {
    isModalOpen.value = false
    selectedHotel.value = null
  }

  function openModalWithHotelOnEvent(hotel: Hotel) {
    return (event: Event) => {
      event.stopPropagation()
      openModalWithHotel(hotel)
    }
  }

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
      const marker = Leaflet.marker(hotelLatLng, { icon: customIcon }).bindPopup(createHotelPopupContent(hotel), {
        maxWidth: 300,
        className: 'hotel-popup-wrapper',
        closeOnClick: false,
      })
      modalOpenOnMarkerClick({ marker, hotel, isTouchDevice, markerClickHandler: openModalWithHotelOnEvent, devLog })
      popupOpenOnMarkerHover({ marker, hotel, isTouchDevice, devLog })
      popupClickListener({ marker, hotel, popupClickHandler: openModalWithHotelOnEvent, devLog })
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

  return { hotels, selectedHotel, isModalOpen, closeModal, bindHotelsMarkers, unbindHotelsMarkers }
}

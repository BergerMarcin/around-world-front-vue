import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import Leaflet from 'leaflet'
import type { LatLngTuple, Map } from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import '../styles/map-marker-popup.css'
import { useLogger } from '@/utils/logger'
import { useHotelsStore, useCartStore } from '@/stores'
import type { Hotel } from '@/types/global.types'
import {
  createHotelPopupContent,
  customIcon,
  openHotelModalOnMarkerClick,
  openHotelModalOnPopupClick,
  openOrClosePopupOnMarkerHover,
} from '../utils/hotel-marker.utils.js'

export function useHotels(): {
  fetchHotelsToStore: () => Promise<void>
  hotels: Ref<Hotel[]>
  selectedHotel: Ref<Hotel | null>
  isHotelModalOpen: Ref<boolean>
  closeHotelModal: () => void
  bindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
  unbindHotelsMarkers: (mapRef: Ref<Map | undefined>) => void
  addToCart: (hotel: Hotel) => void
  isSelectedHotelInCart: ComputedRef<boolean>
} {
  const { devLog } = useLogger()
  const hotelsStore = useHotelsStore()
  const cartStore = useCartStore()

  const hotels: Ref<Hotel[]> = computed(() => hotelsStore.hotels)
  const markerClusterGroup: Ref<Leaflet.MarkerClusterGroup | null> = ref(null)
  const selectedHotel: Ref<Hotel | null> = ref(null)
  const isHotelModalOpen = ref(false)

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
      openHotelModalOnMarkerClick({
        marker,
        hotel,
        isTouchDevice,
        openHotelModal,
      })
      openOrClosePopupOnMarkerHover({ marker, isTouchDevice })
      openHotelModalOnPopupClick({ marker, hotel, openHotelModal })
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

  function openHotelModal(hotel: Hotel) {
    isHotelModalOpen.value = true
    selectedHotel.value = hotel
  }

  function closeHotelModal() {
    isHotelModalOpen.value = false
    selectedHotel.value = null
  }

  function addToCart(hotel: Hotel): void {
    cartStore.addToCart(hotel)
    devLog(`Hotel "${hotel.title}" added to cart.`)
  }

  const isSelectedHotelInCart: ComputedRef<boolean> = computed(() =>
    selectedHotel.value ? cartStore.isCartItemInCart(selectedHotel.value) : false,
  )

  return {
    fetchHotelsToStore: hotelsStore.fetchHotels,
    hotels,
    selectedHotel,
    bindHotelsMarkers,
    unbindHotelsMarkers,
    isHotelModalOpen,
    closeHotelModal,
    addToCart,
    isSelectedHotelInCart,
  }
}

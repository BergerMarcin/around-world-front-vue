import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { useLogger } from '@/utils/logger'
import { useCartStore } from '@/stores'
import type { Hotel } from '@/types/global.types'

const isHotelModalOpen = ref(false)
const hotelForModal: Ref<Hotel | null> = ref(null)

export function useHotelModal(): {
  hotelForModal: Ref<Hotel | null>
  isHotelModalOpen: Ref<boolean>
  openHotelModal: (hotel: Hotel) => void
  closeHotelModal: () => void
  addToCart: (hotel: Hotel) => void
  isHotelForModalInCart: ComputedRef<boolean>
} {
  const { devLog } = useLogger()
  const cartStore = useCartStore()

  function openHotelModal(hotel: Hotel) {
    isHotelModalOpen.value = true
    hotelForModal.value = hotel
  }

  function closeHotelModal() {
    isHotelModalOpen.value = false
    hotelForModal.value = null
  }

  function addToCart(hotel: Hotel): void {
    cartStore.addToCart(hotel)
    devLog(`Hotel "${hotel.title}" added to cart.`)
  }

  const isHotelForModalInCart: ComputedRef<boolean> = computed(() =>
    hotelForModal.value ? cartStore.isCartItemInCart(hotelForModal.value) : false,
  )

  return {
    hotelForModal,
    isHotelModalOpen,
    openHotelModal,
    closeHotelModal,
    addToCart,
    isHotelForModalInCart,
  }
}

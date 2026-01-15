import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { useCartStore } from '@/stores'
import { useLogger } from '@/utils/logger'
import type { Hotel } from '@/types/global.types'

const isHotelModalOpen = ref(false)
const hotelForModal: Ref<Hotel | null> = ref(null)

export function useHotelModal(): {
  hotelForModal: Ref<Hotel | null>
  isHotelModalOpen: Ref<boolean>
  openHotelModal: (hotel: Hotel) => void
  closeHotelModal: () => void
  addHotelToCart: (hotel: Hotel) => void
  isHotelForModalInCart: ComputedRef<boolean>
} {
  const cartStore = useCartStore()
  const { devLog } = useLogger()

  function openHotelModal(hotel: Hotel) {
    isHotelModalOpen.value = true
    hotelForModal.value = hotel
  }

  function closeHotelModal() {
    isHotelModalOpen.value = false
    hotelForModal.value = null
  }

  function addHotelToCart(hotel: Hotel): void {
    cartStore.addToCart(hotel)
    devLog(`Hotel "${hotel.name}" added to cart from hotel modal.`)
  }

  const isHotelForModalInCart: ComputedRef<boolean> = computed(() =>
    hotelForModal.value ? cartStore.isCartItemInCart(hotelForModal.value) : false,
  )

  return {
    hotelForModal,
    isHotelModalOpen,
    openHotelModal,
    closeHotelModal,
    addHotelToCart,
    isHotelForModalInCart,
  }
}

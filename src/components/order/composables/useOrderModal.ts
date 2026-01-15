import { ref } from 'vue'
import type { Ref } from 'vue'

import { useCartStore } from '@/stores'
import { useLogger } from '@/utils/logger'
import type { CartItem } from '@/types/global.types'

const isOrderModalOpen = ref(false)
const cartItemsToBeOrdered: Ref<CartItem[] | null> = ref(null)

export function useOrderModal(): {
  cartItemsToBeOrdered: Ref<CartItem[] | null>
  isOrderModalOpen: Ref<boolean>
  openOrderModal: () => void
  closeOrderModal: () => void
  orderAll: () => void
} {
  const { cartItems, clearCart } = useCartStore()
  const { devLog } = useLogger()

  function itemsSummaryText(): string {
    const names = cartItems.map((item) => item.name).join(', ')
    return `${cartItems.length} items: ${names}`
  }

  function openOrderModal() {
    isOrderModalOpen.value = true
    cartItemsToBeOrdered.value = cartItems
    devLog(`Order modal opened with ${itemsSummaryText()}`)
  }

  function closeOrderModal() {
    isOrderModalOpen.value = false
    cartItemsToBeOrdered.value = null
  }

  function orderAll() {
    devLog(`Ordered ${itemsSummaryText()}`)
    clearCart()
    closeOrderModal()
  }

  return {
    cartItemsToBeOrdered,
    isOrderModalOpen,
    openOrderModal,
    closeOrderModal,
    orderAll,
  }
}

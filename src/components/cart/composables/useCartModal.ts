import { computed, ref } from 'vue'
import { type ComputedRef, type Ref } from 'vue'
import { useCartStore } from '@/stores/cart-store'
import { useOrderModal } from '@/components/order/composables/useOrderModal'
import type { CartItem } from '@/types/global.types'

const isCartModalOpen = ref(false)
const selectedCartItems = ref<CartItem[]>([])

export const useCartModal = (): {
  isCartModalOpen: Ref<boolean>
  closeCartModal: () => void
  toggleOpenCartModal: () => void
  selectedCartItems: Ref<CartItem[]>
  isAnySelectedCartItem: ComputedRef<boolean>
  isCartItemSelected: (cartItem: CartItem) => boolean
  toggleCartItemSelection: (cartItem: CartItem) => void
  removeSelectedCartItems: () => void
  orderSelectedCartItems: () => void
} => {
  const { removeFromCart } = useCartStore()
  const { openOrderModal } = useOrderModal()

  function closeCartModal() {
    isCartModalOpen.value = false
    selectedCartItems.value = []
  }

  function toggleOpenCartModal() {
    isCartModalOpen.value = !isCartModalOpen.value
    if (!isCartModalOpen.value) {
      selectedCartItems.value = []
    }
  }

  const isAnySelectedCartItem = computed(() => selectedCartItems.value.length > 0)

  function isCartItemSelected(cartItem: CartItem): boolean {
    return selectedCartItems.value.some((item) => item.sku === cartItem.sku)
  }

  function toggleCartItemSelection(cartItem: CartItem) {
    if (isCartItemSelected(cartItem)) {
      selectedCartItems.value = selectedCartItems.value.filter((item) => item.sku !== cartItem.sku)
    } else {
      selectedCartItems.value.push(cartItem)
    }
  }

  function removeSelectedCartItems() {
    selectedCartItems.value.forEach(removeFromCart)
    closeCartModal()
  }

  function orderSelectedCartItems() {
    openOrderModal()
    closeCartModal()
  }

  return {
    isCartModalOpen,
    closeCartModal,
    toggleOpenCartModal,
    selectedCartItems,
    isAnySelectedCartItem,
    isCartItemSelected,
    toggleCartItemSelection,
    removeSelectedCartItems,
    orderSelectedCartItems,
  }
}

import { computed, ref } from 'vue'
import { type ComputedRef, type Ref } from 'vue'
import { useCartStore } from '@/stores/cart-store'
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
  toggleSelectionCartItem: (cartItem: CartItem) => void
  removeFromCartSelectedCartItems: () => void
} => {
  const { removeFromCart } = useCartStore()

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

  function toggleSelectionCartItem(cartItem: CartItem) {
    if (isCartItemSelected(cartItem)) {
      selectedCartItems.value = selectedCartItems.value.filter((item) => item.sku !== cartItem.sku)
    } else {
      selectedCartItems.value.push(cartItem)
    }
  }

  function removeFromCartSelectedCartItems() {
    selectedCartItems.value.forEach(removeFromCart)
    closeCartModal()
  }

  return {
    isCartModalOpen,
    closeCartModal,
    toggleOpenCartModal,
    selectedCartItems,
    isAnySelectedCartItem,
    isCartItemSelected,
    toggleSelectionCartItem,
    removeFromCartSelectedCartItems,
  }
}

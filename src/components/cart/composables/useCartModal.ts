import { ref } from 'vue'
import { type Ref } from 'vue'

const isCartModalOpen = ref(false)

export const useCartModal = (): {
  isCartModalOpen: Ref<boolean>
  openCartModal: () => void
  closeCartModal: () => void
  toggleOpenCartModal: () => void
} => {
  function openCartModal() {
    isCartModalOpen.value = true
  }

  function closeCartModal() {
    isCartModalOpen.value = false
  }

  function toggleOpenCartModal() {
    isCartModalOpen.value = !isCartModalOpen.value
    console.log('Toggled cart modal, is now open:', isCartModalOpen.value)
  }

  return { isCartModalOpen, openCartModal, closeCartModal, toggleOpenCartModal }
}

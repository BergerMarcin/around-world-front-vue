<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const modalRef = ref<HTMLDialogElement | null>(null)

function handleClose() {
  emit('close')
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === modalRef.value) {
    handleClose()
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    handleClose()
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      modalRef.value?.showModal()
    } else {
      modalRef.value?.close()
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <dialog ref="modalRef" class="modal" @click="handleBackdropClick">
    <div class="modal__container">
      <button class="modal__close-btn" type="button" aria-label="Close modal" @click="handleClose">×</button>
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal:not([open]) {
  display: none;
}

.modal::backdrop {
  background: var(--color-overlay-medium);
  backdrop-filter: blur(1px);
}

.modal__container {
  position: relative;
  background: var(--color-bg-white);
  border-radius: 12px;
  box-shadow: 0 8px 32px var(--color-overlay-lighter);
  max-width: 85vw;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal__close-btn {
  position: absolute;
  top: 8px;
  right: 22px;
  z-index: 10;
  background: var(--color-overlay-faint);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-dark);
  transition: background 0.2s ease;
}

.modal__close-btn:hover {
  background: var(--color-overlay-light);
  color: black;
}

.modal__content {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal__content::-webkit-scrollbar {
  width: 10px;
}

.modal__content::-webkit-scrollbar-track {
  background: var(--color-scrollbar-track);
  border-radius: 5px;
}

.modal__content::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar-thumb);
  border-radius: 5px;
}

.modal__content::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover);
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import type { SweetAlertIcon } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export type ToastType = SweetAlertIcon

const toastTypeRef = ref<ToastType>('warning')
const isOpen = ref(false)
const message = ref('')

const iconColor = computed<string>(() => {
  switch (toastTypeRef.value) {
    case 'success':
      return 'green'
    case 'error':
      return 'rgb(182, 45, 45)'
    case 'warning':
      return 'orange'
    case 'info':
      return 'rgb(84, 84, 84)'
    case 'question':
      return 'purple'
    default:
      return 'rgb(84, 84, 84)'
  }
})

const popupBackgroundColor = computed<string>(() => {
  switch (toastTypeRef.value) {
    case 'success':
      return 'rgb(229, 255, 229)'
    case 'error':
      return 'rgb(255, 229, 229)'
    case 'warning':
      return 'rgb(255, 244, 229)'
    case 'info':
      return 'rgb(200, 200, 200)'
    case 'question':
      return 'rgb(240, 229, 255)'
    default:
      return 'rgb(200, 200, 200)'
  }
})

onMounted(() => {
  message.value = 'This is an warning toast message! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'
  showToast({ message: message.value, toastType: toastTypeRef.value })
  setTimeout(() => {
    message.value = 'This is another success toast message! Consectetur adipiscing elit.'
    showToast({ message: message.value, toastType: 'success', isTimer: true })
  }, 2000)
  setTimeout(() => {
    message.value = 'This is another error toast message!'
    showToast({ message: message.value, toastType: 'error', isTimer: true })
  }, 4000)
  setTimeout(() => {
    message.value = 'info toast'
    showToast({ message: message.value, toastType: 'info' })
  }, 6000)
  setTimeout(() => {
    message.value = 'question toast'
    showToast({ message: message.value, toastType: 'question' })
  }, 8000)
})

const showToast = ({
  message,
  toastType = 'info',
  isTimer = false,
}: {
  message: string
  toastType?: ToastType
  isTimer?: boolean
}) => {
  toastTypeRef.value = toastType
  Swal.fire({
    text: message,
    icon: toastType,
    position: 'bottom-left',
    timer: isTimer ? 3000 : undefined,
    timerProgressBar: !!isTimer,
    showConfirmButton: false,
    showCloseButton: true,
    closeButtonAriaLabel: 'Close alert',
    customClass: {
      popup: 'custom-swal-popup',
      closeButton: 'custom-swal-close-button',
      icon: 'custom-swal-icon',
      htmlContainer: 'custom-swal-html-container',
    },
    didOpen: () => {
      isOpen.value = true
      const swalPopup = document.querySelector('.custom-swal-popup') as HTMLElement
      if (swalPopup) {
        swalPopup.style.setProperty('--popup-background-color', popupBackgroundColor.value)
        swalPopup.style.setProperty('--icon-color', iconColor.value)
      }
    },
    didClose: () => {
      isOpen.value = false
      console.log('Alert toast closed')
    },
  })
}
</script>

<template></template>

<style>
.custom-swal-popup {
  background-color: var(--popup-background-color);
  margin: 50px;
  padding: 0;
  width: 350px;
  font-size: 1rem;
  grid-template-columns: 1fr 99fr 1fr;
  grid-column: 1/4;
  grid-row: 1/4;
}

.custom-swal-close-button {
  color: rgb(84, 84, 84);
  grid-column: 3/3;
  grid-row: 1/99;
  font-size: 2rem;
}
.custom-swal-close-button:hover {
  color: rgb(107, 32, 32);
}

.custom-swal-icon {
  scale: 0.5;
  margin: 20px 0;
  color: var(--icon-color) !important;
  border-color: var(--icon-color) !important;
}
/* icon's inner lines color */
div:where(.swal2-icon).swal2-error [class^='swal2-x-mark-line'],
div:where(.swal2-icon).swal2-success [class^='swal2-success-line'] {
  background-color: var(--icon-color) !important;
}

.custom-swal-html-container {
  align-content: center;
  padding: 15px 0;
  font-weight: 500;
}
</style>

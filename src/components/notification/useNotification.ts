import { ref } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import type { ToastType, ShowToast, ToastOptions } from './notification.types'

const isOpen = ref(false)

const iconColor = (toastType: ToastType): string => {
  switch (toastType) {
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
}

const popupBackgroundColor = (toastType: ToastType): string => {
  switch (toastType) {
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
}

const showToast: ShowToast = (message: string, toastOptions: ToastOptions) => {
  const { toastType, timer }: Required<ToastOptions> = {
    toastType: 'info',
    timer: 0,
    ...toastOptions,
  }
  isOpen.value = true
  Swal.fire({
    text: message,
    icon: toastType,
    position: 'bottom-left',
    timer: timer > 0 ? timer : undefined,
    timerProgressBar: timer > 0,
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
      console.log('Alert toast opened')
      const swalPopup = document.querySelector('.custom-swal-popup') as HTMLElement
      if (swalPopup) {
        swalPopup.style.setProperty('--popup-background-color', popupBackgroundColor(toastType))
        swalPopup.style.setProperty('--icon-color', iconColor(toastType))
      }
    },
    didClose: () => {
      isOpen.value = false
      console.log('Alert toast closed')
    },
  })
}

export function useNotification() {
  return {
    showToast,
    isOpen,
  }
}

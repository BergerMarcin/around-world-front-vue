import { ref } from 'vue'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import type { NotificationType, ShowNotification, NotificationOptions } from './notification.types'

const isOpen = ref(false)

const iconColor = (toastType: NotificationType): string => {
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

const popupBackgroundColor = (toastType: NotificationType): string => {
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

const showNotification: ShowNotification = (message: string, toastOptions: NotificationOptions) => {
  const { notificationType, timer }: Required<NotificationOptions> = {
    notificationType: 'info',
    timer: 0,
    ...toastOptions,
  }
  isOpen.value = true
  Swal.fire({
    text: message,
    icon: notificationType,
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
      const swalPopup = document.querySelector('.custom-swal-popup') as HTMLElement
      if (swalPopup) {
        swalPopup.style.setProperty('--popup-background-color', popupBackgroundColor(notificationType))
        swalPopup.style.setProperty('--icon-color', iconColor(notificationType))
      }
    },
    didClose: () => {
      isOpen.value = false
    },
  })
}

export function useNotification() {
  return {
    showNotification,
    isOpen,
  }
}

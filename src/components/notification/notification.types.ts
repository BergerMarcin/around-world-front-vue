import type { SweetAlertIcon } from 'sweetalert2'

export type ToastType = SweetAlertIcon

export type ToastOptions = {
  toastType?: ToastType
  timer?: number
}

export type ShowToast = (message: string, toastOptions: ToastOptions) => void

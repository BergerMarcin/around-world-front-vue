import type { SweetAlertIcon } from 'sweetalert2'

export type NotificationType = SweetAlertIcon

export type NotificationOptions = {
  notificationType?: NotificationType
  timer?: number
}

export type ShowNotification = (message: string, notificationOptions: NotificationOptions) => void

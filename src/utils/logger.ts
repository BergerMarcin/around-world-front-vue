import { inject } from 'vue'
import type { ShallowRef } from 'vue'

export function useLogger() {
  const logsContainer: Readonly<ShallowRef<HTMLElement | null>> | undefined = inject('logsContainer')

  function logHotelEvent(logText: string): void {
    if (import.meta.env.DEV && import.meta.env.VITE_LOG === 'true') {
      console.log(logText)
      const el = logsContainer?.value
      if (el) {
        el.innerText += ` | ${logText}`
      }
    }
  }

  return { logHotelEvent }
}

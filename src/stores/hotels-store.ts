import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import { ProviderKey } from '@/types/global.types'
import { useNotification } from '@/components-ui/notification/useNotification'
import type { Hotel } from '@/types/global.types'
import type { BackendApiService } from '@/api/types/backend-api-service.types'

export const useHotelsStore = defineStore('hotels', () => {
  const { showNotification } = useNotification()
  const hotels = ref<Hotel[]>([])

  const backendApiService = inject<BackendApiService>(ProviderKey.BACKEND_API_SERVICE)

  const fetchHotels = async () => {
    try {
      hotels.value = await backendApiService!.hotelsService.hotels()
      if (!hotels.value.length) {
        showNotification('No valid hotels data available.', { notificationType: 'warning', timer: 5000 })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showNotification('Could not load hotels. Please try again later', { notificationType: 'error' })
    }
  }

  return { hotels, fetchHotels }
})

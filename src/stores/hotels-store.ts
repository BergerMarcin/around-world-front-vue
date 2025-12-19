import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import { ProviderKey } from '@/types/global.types'
import { useNotification } from '@/components/notification/useNotification'
import type { Hotel } from '@/types/global.types'
import type { BackendApiService } from '@/api/types/backend-api-service.types'

export const useHotelsStore = defineStore('hotels', () => {
  const { showToast } = useNotification()
  const hotels = ref<Hotel[]>([])

  const backendApiService = inject<BackendApiService>(ProviderKey.BACKEND_API_SERVICE)

  const fetchHotels = async () => {
    try {
      const hotelsResponse = await backendApiService!.hotelsService.hotels()
      hotels.value = hotelsResponse
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast('Could not load hotels. Please try again later', { toastType: 'error', timer: 3000 })
    }
  }

  return { hotels, fetchHotels }
})

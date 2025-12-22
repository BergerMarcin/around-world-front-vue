import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import { ProviderKey } from '@/types/global.types'
import { useNotification } from '@/components/notification/useNotification'
import type { Hotel } from '@/types/global.types'
import type { BackendApiService } from '@/api/types/backend-api-service.types'
import { isHotelArrayTypeguard } from '@/types/global.typeguard'

export const useHotelsStore = defineStore('hotels', () => {
  const { showNotification } = useNotification()
  const hotels = ref<Hotel[]>([])

  const backendApiService = inject<BackendApiService>(ProviderKey.BACKEND_API_SERVICE)

  const fetchHotels = async () => {
    try {
      const hotelsResponse = await backendApiService!.hotelsService.hotels({ typeguard: isHotelArrayTypeguard })
      hotels.value = hotelsResponse
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showNotification('Could not load hotels. Please try again later', { notificationType: 'error', timer: 3000 })
    }
  }

  return { hotels, fetchHotels }
})

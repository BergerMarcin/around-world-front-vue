import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import { ProviderKey } from '@/types/global.types'
import type { Hotel } from '@/types/global.types'
import type { BackendApiService } from '@/api/types/backend-api-service.types'

export const useHotelsStore = defineStore('hotels', () => {
  const hotels = ref<Hotel[]>([])

  const backendApiService = inject<BackendApiService>(ProviderKey.BACKEND_API_SERVICE)

  const fetchHotels = async () => {
    const hotelsResponse = await backendApiService!.hotelsService.hotels()
    hotels.value = hotelsResponse
  }

  return { hotels, fetchHotels }
})

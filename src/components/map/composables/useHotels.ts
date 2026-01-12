import { computed } from 'vue'
import type { Ref } from 'vue'
import { useHotelsStore } from '@/stores'
import type { Hotel } from '@/types/global.types'

let hotels: Ref<Hotel[]>

export function useHotels(): {
  hotels: Ref<Hotel[]>
  fetchHotelsToStore: () => Promise<void>
} {
  const hotelsStore = useHotelsStore()

  hotels = computed(() => hotelsStore.hotels)

  return {
    hotels,
    fetchHotelsToStore: hotelsStore.fetchHotels,
  }
}

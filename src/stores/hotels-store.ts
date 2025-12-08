import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Hotel } from '@/types'
import axios from '@/utils/axios'

export const useHotelsStore = defineStore('hotels', () => {
  const hotels = ref<Hotel[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchHotels() {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Hotel[]>('/hotels')
      hotels.value = response.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch hotels'
      console.error('Error fetching hotels:', e)
    } finally {
      loading.value = false
    }
  }

  return { hotels, loading, error, fetchHotels }
})

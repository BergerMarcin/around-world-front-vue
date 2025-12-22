import type { LatLngTuple } from 'leaflet'

export interface Hotel {
  id: number
  name: string
  localisation: LatLngTuple
  address: string
  price: number
  currency: string
  rating?: number
  description: string
  image: string
  amenities?: string[]
}

export enum ProviderKey {
  BACKEND_API_SERVICE = 'backendApiService',
  LOGS_CONTAINER = 'logsContainer',
}


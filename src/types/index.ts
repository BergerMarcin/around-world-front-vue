import type { LatLngTuple } from 'leaflet'

export interface Hotel {
  id: number
  name: string
  localisation: LatLngTuple
  address: string
  price: number
  currency: string
  rating: number
  image: string
  description: string
  amenities: string[]
}

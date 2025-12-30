import type { Hotel } from './global.types'
import { LogLevel, useLogger } from '@/utils/logger'

export function isHotelTypeguard(obj: unknown): obj is Hotel {
  if (typeof obj !== 'object' || obj === null) return false
  const h = obj as Record<string, unknown>
  return (
    typeof h.sku === 'string' &&
    typeof h.title === 'string' &&
    typeof h.location_country === 'string' &&
    typeof h.location_region === 'string' &&
    typeof h.location_coordinates_latitude === 'number' &&
    typeof h.location_coordinates_longitude === 'number' &&
    (typeof h.rate === 'number' || typeof h.rate === 'undefined') &&
    (typeof h.source_url === 'string' || typeof h.source_url === 'undefined') &&
    typeof h.image === 'string' &&
    typeof h.price === 'number' &&
    typeof h.currency === 'string' &&
    typeof h.category === 'string' &&
    typeof h.description_general === 'string' &&
    typeof h.description_location === 'string' &&
    typeof h.description_hotel === 'string' &&
    typeof h.description_food_drinks === 'string' &&
    typeof h.description_room === 'string' &&
    typeof h.description_beach === 'string' &&
    typeof h.description_sport_entertainment === 'string'
  )
}

export function isHotelsTypeguard(hotels: unknown): hotels is Hotel[] {
  const { devLog } = useLogger()

  if (typeof hotels !== 'object' || hotels === null || !Array.isArray(hotels)) {
    devLog(LogLevel.error, 'Hotels is not an array')
    return false
  }

  const hotelsNotPassed: { index: number; id: number | undefined; hotel: unknown }[] = []
  hotels.every((hotel, index) => {
    if (!isHotelTypeguard(hotel)) {
      hotelsNotPassed.push({ index, id: hotel?.id, hotel })
    }
  })
  if (hotelsNotPassed.length) {
    devLog(LogLevel.error, 'Some hotels did not pass the typeguard:', hotelsNotPassed)
    return false
  }

  return true
}

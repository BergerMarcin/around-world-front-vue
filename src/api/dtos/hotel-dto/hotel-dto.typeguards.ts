import type { HotelDTO } from '@/api/dtos/hotel-dto/hotel-dto.type'
import { LogLevel, consoleDevLog } from '@/utils/logger'

export function isHotelDTOsArrayTypeguard(data: unknown): data is HotelDTO[] {
  if (typeof data !== 'object' || data === null || !Array.isArray(data)) {
    consoleDevLog(LogLevel.error, 'Hotels is not an array')
    return false
  }
  return true
}

export function isHotelDTOTypeguard(data: unknown): data is HotelDTO {
  if (typeof data !== 'object' || data === null) return false
  const h = data as Record<string, unknown>
  return (
    typeof h.sku === 'string' &&
    typeof h.title === 'string' &&
    typeof h.location_country === 'string' &&
    typeof h.location_region === 'string' &&
    typeof h.location_coordinates_latitude === 'number' &&
    typeof h.location_coordinates_longitude === 'number' &&
    (typeof h.rate === 'number' || typeof h.rate === 'undefined' || h.rate === null) &&
    (typeof h.source_url === 'string' || typeof h.source_url === 'undefined' || h.source_url === null) &&
    typeof h.image === 'string' &&
    (typeof h.image_file === 'string' || typeof h.image_file === 'undefined') &&
    typeof h.price === 'number' &&
    typeof h.currency === 'string' &&
    typeof h.category === 'string' &&
    h.category === 'hotel' &&
    typeof h.description_general === 'string' &&
    typeof h.description_location === 'string' &&
    typeof h.description_hotel === 'string' &&
    typeof h.description_food_drinks === 'string' &&
    typeof h.description_room === 'string' &&
    typeof h.description_beach === 'string' &&
    typeof h.description_sport_entertainment === 'string'
  )
}

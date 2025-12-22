import type { Hotel } from './global.types'
import { LogLevel, useLogger } from '@/utils/logger'

export function isHotelTypeguard(obj: unknown): obj is Hotel {
  if (typeof obj !== 'object' || obj === null) return false
  const h = obj as Record<string, unknown>
  return (
    typeof h.id === 'number' &&
    typeof h.name === 'string' &&
    Array.isArray(h.localisation) &&
    h.localisation.length === 2 &&
    typeof h.localisation[0] === 'number' &&
    typeof h.localisation[1] === 'number' &&
    typeof h.address === 'string' &&
    typeof h.price === 'number' &&
    typeof h.currency === 'string' &&
    typeof h.rating === 'number' &&
    typeof h.image === 'string' &&
    typeof h.description === 'string' &&
    Array.isArray(h.amenities) &&
    h.amenities.every((a) => typeof a === 'string')
  )
}

export function isHotelArrayTypeguard(hotels: unknown): hotels is Hotel[] {
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

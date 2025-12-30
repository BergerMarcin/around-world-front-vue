import type { Hotel } from '@/types/global.types'
import { isHotelTypeguard } from '@/types/global.typeguard'
import { LogLevel, consoleDevLog } from '@/utils/logger'

export function validateHotels(hotels: unknown[]): Hotel[] {
  const hotelsNotPassed: { index: number; sku: string | undefined; hotel: unknown }[] = []
  hotels.forEach((hotel, index) => {
    if (!isHotelTypeguard(hotel)) {
      hotelsNotPassed.push({ index, sku: (hotel as Record<string, unknown>)?.sku as string | undefined, hotel })
    }
  })
  if (hotelsNotPassed.length) {
    consoleDevLog(LogLevel.error, 'Some hotels did not pass the typeguard:', hotelsNotPassed)
  }

  return hotels.filter(isHotelTypeguard)
}

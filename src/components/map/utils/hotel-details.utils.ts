import type { Hotel } from '@/types/global.types'

export function imageUrlFromHotel(hotel: Hotel): string {
  return `${import.meta.env.VITE_IMAGES_BASE_URL}${hotel.image_file}`
}

export function rateStandardized(hotel: Hotel): string {
  return hotel.rate ? hotel.rate.toFixed(1) : ''
}

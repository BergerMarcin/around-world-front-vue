import { isHotelDTOTypeguard } from './hotel-dto.typeguards'
import { consoleDevLog, LogLevel } from '@/utils/logger'
import { NO_IMAGE } from '@/types/global.types'
import type { Hotel } from '@/types/global.types'
import type { HotelDTO } from '@/api/dto/hotel-dto/hotel-dto.type'

export function filterValidHotelDTOs(dataArray: unknown[]): HotelDTO[] {
  return dataArray.filter(isHotelDTOTypeguard)
}

export function consoleInvalidHotelDTOs(dataArray: unknown[]): void {
  if (!import.meta.env.VITE_LOG) {
    return
  }
  const hotelsNotPassed: { index: number; sku: string | undefined; hotel: unknown }[] = []
  dataArray.forEach((hotel, index) => {
    if (!isHotelDTOTypeguard(hotel)) {
      hotelsNotPassed.push({ index, sku: (hotel as Record<string, unknown>)?.sku as string | undefined, hotel })
    }
  })
  if (hotelsNotPassed.length) {
    consoleDevLog(LogLevel.error, 'Some hotels did not pass the typeguard:', hotelsNotPassed)
  }
}

const getImageUrl = (imageFile?: string): string =>
  imageFile ? `${import.meta.env.VITE_IMAGES_BASE_URL}${imageFile}` : NO_IMAGE.URL

const getImageAlt = (imageFile?: string, hotelName?: string): string =>
  imageFile ? (hotelName ?? NO_IMAGE.ALT) : NO_IMAGE.ALT

const rateNormalization = (rate?: number | null): string => (rate ? rate.toFixed(1) : '')

// Map Response to ViewModel
const mapHotelDTOToHotel = (hotelDTO: HotelDTO): Hotel => {
  return {
    sku: hotelDTO.sku,
    name: hotelDTO.title,
    location: {
      country: hotelDTO.location_country,
      region: hotelDTO.location_region,
      coordinates: {
        latitude: hotelDTO.location_coordinates_latitude,
        longitude: hotelDTO.location_coordinates_longitude,
      },
    },
    rate: rateNormalization(hotelDTO.rate),
    sourceUrl: hotelDTO.source_url ?? undefined,
    image: {
      url: getImageUrl(hotelDTO.image_file),
      alt: getImageAlt(hotelDTO.image_file, hotelDTO.title),
      sourceUrl: hotelDTO.image,
    },
    price: hotelDTO.price,
    currency: hotelDTO.currency,
    category: hotelDTO.category,
    description: {
      general: hotelDTO.description_general,
      location: hotelDTO.description_location,
      hotel: hotelDTO.description_hotel,
      foodDrinks: hotelDTO.description_food_drinks,
      room: hotelDTO.description_room,
      beach: hotelDTO.description_beach,
      sportEntertainment: hotelDTO.description_sport_entertainment,
    },
  }
}

// Map Response to ViewModel
export function mapHotelDTOsToHotels(hotelDTOs: HotelDTO[]): Hotel[] {
  return hotelDTOs.map(mapHotelDTOToHotel)
}

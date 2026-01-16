import { isHotelDTOsArrayTypeguard } from '../dtos/hotel-dto/hotel-dto.typeguards'
import type { Hotel } from '@/types/global.types'
import type { HotelDTO } from '../dtos/hotel-dto/hotel-dto.type'
import type { ApiClientOptions, ApiServiceOptions } from '../http/types/http-client.types'
import type { ApiServiceConfig } from '../types/backend-api-service.types'
import { consoleInvalidHotelDTOs, filterValidHotelDTOs, mapHotelDTOsToHotels } from '../dtos/hotel-dto/hotel-dto.utils'

export interface HotelsServiceClient {
  hotels: (options?: ApiServiceOptions) => Promise<Hotel[]>
}

export const createHotelsServiceClient = (serviceConfig: ApiServiceConfig): HotelsServiceClient => {
  const { client, errorHandler, showNotification } = serviceConfig
  return {
    hotels: (options?: ApiServiceOptions): Promise<Hotel[]> => {
      const mergedOptions: ApiClientOptions = { ...options, typeguard: isHotelDTOsArrayTypeguard }
      const hotels = errorHandler(client.get<unknown[]>('/hotels', undefined, mergedOptions))
        .catch((error) => {
          showNotification('Could not load hotels. Please try again later', { notificationType: 'error', timer: 5000 })
          return Promise.reject(error)
        })
        .then((dataArray: unknown[]): Promise<HotelDTO[]> => {
          consoleInvalidHotelDTOs(dataArray)
          const validHotelDTOs: HotelDTO[] = filterValidHotelDTOs(dataArray)
          return Promise.resolve(validHotelDTOs)
        })
        .then((hotelDTOs: HotelDTO[]): Promise<Hotel[]> => {
          return Promise.resolve(mapHotelDTOsToHotels(hotelDTOs))
        })
      return hotels
    },
  }
}

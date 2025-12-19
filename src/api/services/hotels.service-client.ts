import type { Hotel } from '@/types/global.types'
import type { ApiClientOptions } from '../http/types/http-client.types'
import type { ApiServiceConfig } from '../types/backend-api-service.types'

export interface HotelsServiceClient {
  hotels: (options?: ApiClientOptions) => Promise<Hotel[]>
}

export const createHotelsServiceClient = (serviceConfig: ApiServiceConfig): HotelsServiceClient => {
  const { client, errorHandler, showToast } = serviceConfig
  return {
    hotels: (options?: ApiClientOptions): Promise<Hotel[]> =>
      errorHandler(client.get<Hotel[]>('/hotels', undefined, options)).catch((error) => {
        showToast('Could not load hotels. Please try again later', { toastType: 'error', timer: 3000 })
        return Promise.reject(error)
      }),
  }
}

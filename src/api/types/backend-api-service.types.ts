import type { ShowNotification } from '@/components-ui/notification/notification.types'
import type { HttpClientMethods } from '../http/types/http-client.types'
import type { HotelsServiceClient } from '../services/hotels.service-client'

export interface BackendApiServiceFactoryConfig {
  // acquireToken: () => Promise<string | undefined>
  errorHandler: <ResponseType>(request: Promise<ResponseType>) => Promise<ResponseType>
  showNotification: ShowNotification
}

export interface ApiServiceConfig {
  client: HttpClientMethods
  errorHandler: <ResponseType>(request: Promise<ResponseType>) => Promise<ResponseType>
  showNotification: ShowNotification
}

export interface BackendApiService {
  hotelsService: HotelsServiceClient
}

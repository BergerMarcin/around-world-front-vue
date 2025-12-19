import type { HttpClientMethods } from './http/types/http-client.types'
import { createHttpClient } from './http/http-client'
import type { HttpClientConfig } from './http/types/http-client.types'
import { createHotelsServiceClient } from './services/hotels.service-client'
import type {
  ApiServiceConfig,
  BackendApiService,
  BackendApiServiceFactoryConfig,
} from './types/backend-api-service.types'

export const backendApiServiceFactory = (factoryConfig: BackendApiServiceFactoryConfig): BackendApiService => {
  // const { acquireToken, errorHandler, showNotification } = factoryConfig
  const { errorHandler, showNotification } = factoryConfig

  const httpClientConfig: HttpClientConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
    // acquireToken,
  }

  const httpClient: HttpClientMethods = createHttpClient(httpClientConfig)

  const apiServiceConfig: ApiServiceConfig = { client: httpClient, errorHandler, showNotification }

  const hotelsServiceClient = createHotelsServiceClient(apiServiceConfig)

  return {
    hotelsService: hotelsServiceClient,
  }
}

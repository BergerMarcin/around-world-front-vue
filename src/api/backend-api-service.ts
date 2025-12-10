import { backendApiServiceFactory } from './backend-api-service.factory'
import type { BackendApiService, BackendApiServiceFactoryConfig } from './types/backend-api-service.types'

export function useBackendApiService(): BackendApiService {
  const errorHandler = <ResponseType>(request: Promise<ResponseType>): Promise<ResponseType> => {
    return request.catch((error) => {
      console.error('API request error:', error)
      throw error
    })
  }

  const factoryConfig: BackendApiServiceFactoryConfig = { errorHandler } // , showToast, acquireToken }

  const backendApiService = backendApiServiceFactory(factoryConfig)

  return backendApiService
}

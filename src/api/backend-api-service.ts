import { backendApiServiceFactory } from './backend-api-service.factory'
import type { BackendApiService, BackendApiServiceFactoryConfig } from './types/backend-api-service.types'
import { errorHandler } from './utils/error-handler'

export function useBackendApiService(): BackendApiService {
  const factoryConfig: BackendApiServiceFactoryConfig = { errorHandler } // , showToast, acquireToken }

  const backendApiService = backendApiServiceFactory(factoryConfig)

  return backendApiService
}

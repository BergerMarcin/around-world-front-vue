import { backendApiServiceFactory } from './backend-api-service.factory'
import type { BackendApiService, BackendApiServiceFactoryConfig } from './types/backend-api-service.types'
import { errorHandler } from './utils/error-handler'
import { useNotification } from '../components/notification/useNotification'

export function useBackendApiService(): BackendApiService {
  const { showToast } = useNotification()
  const factoryConfig: BackendApiServiceFactoryConfig = { errorHandler, showToast} // , acquireToken }

  const backendApiService = backendApiServiceFactory(factoryConfig)

  return backendApiService
}

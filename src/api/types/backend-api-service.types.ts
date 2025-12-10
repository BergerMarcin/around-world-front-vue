// import { AlertMessageOptions } from "../components/alert-message/alert-message-provider";
import type { HttpClientMethods } from '../http/types/http-client.types'
import type { HotelsServiceClient } from '../services/hotels.service-client'

export interface BackendApiServiceFactoryConfig {
  // acquireToken: () => Promise<string | undefined>
  errorHandler: <ResponseType>(request: Promise<ResponseType>) => Promise<ResponseType>
  // showToast: (message: string, options?: AlertMessageOptions | undefined) => void;
}

export interface ApiServiceConfig {
  client: HttpClientMethods
  errorHandler: <ResponseType>(request: Promise<ResponseType>) => Promise<ResponseType>
  // showToast: (message: string, options?: AlertMessageOptions | undefined) => void;
}

export interface BackendApiService {
  hotelsService: HotelsServiceClient
}

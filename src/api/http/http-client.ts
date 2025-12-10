import type { HttpClientConfig, AxiosHttpClientConfig, HttpClientMethods } from './types/http-client.types'
import {
  HttpHeaders,
  REQUEST_TIMEOUT,
  DEFAULT_MAX_REQUESTS_COUNT,
  REQUEST_CONCURRENCY_DELAY,
} from './types/http-client.consts'
import { createAxiosHttpClient } from './axios-http-client'

const getAuthorizationHeader = async (acquireToken: () => Promise<string | undefined>): Promise<string> => {
  return `Bearer ${await acquireToken()}`
}

export const createHttpClient = (config: HttpClientConfig): HttpClientMethods => {
  const httpClientConfig: AxiosHttpClientConfig = {
    headers: {
      [HttpHeaders.CONTENT_TYPE]: 'application/json',
      [HttpHeaders.ACCEPT]: '*/*',
    },
    withCredentials: true,
    timeout: REQUEST_TIMEOUT,
    maxConcurrentRequests: DEFAULT_MAX_REQUESTS_COUNT,
    requestConcurrencyDelay: REQUEST_CONCURRENCY_DELAY,
    getAuthorizationHeader,
    ...config,
  }

  const httpClientMethods: HttpClientMethods = createAxiosHttpClient(httpClientConfig)

  return httpClientMethods
}

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AxiosHttpClientConfig } from './types/http-client.types'

export function createAxiosInstance(config: AxiosHttpClientConfig): AxiosInstance {
  const { baseURL, headers, withCredentials, timeout, maxConcurrentRequests, requestConcurrencyDelay } = config

  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    withCredentials,
    timeout,
    headers,
  })

  let pendingRequests = 0
  axiosInstance.interceptors.request.use((config) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (pendingRequests < maxConcurrentRequests) {
          pendingRequests++
          clearInterval(interval)
          resolve(config)
        }
      }, requestConcurrencyDelay)
    })
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      pendingRequests = Math.max(0, pendingRequests - 1)
      return Promise.resolve(response)
    },
    (error) => {
      pendingRequests = Math.max(0, pendingRequests - 1)
      return Promise.reject(error)
    },
  )

  return axiosInstance
}

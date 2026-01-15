import { createAxiosInstance } from './axios-instance'
import type { AxiosInstance } from 'axios'
import type { ApiClientOptions, AxiosHttpClientConfig, HttpClientMethods } from './types/http-client.types'
import { HttpHeaders } from './types/http-client.consts'

export const createAxiosHttpClient = (config: AxiosHttpClientConfig): HttpClientMethods => {
  const axiosInstance: AxiosInstance = createAxiosInstance(config)

  return {
    async get<ResponseType>(
      endpointUrl: string,
      parameters?: Record<string, string | number | boolean | null>,
      // { cancelToken, headers, validatorOrTypeguard }: { cancelToken?: CancelToken; headers?: Record<string, string>; validatorOrTypeguard?: ValidatorOrTypeguard } = {},
      { headers, validator, typeguard }: ApiClientOptions = {},
    ): Promise<ResponseType> {
      const response = await axiosInstance.get<ResponseType>(endpointUrl, {
        params: parameters,
        // cancelToken: cancelToken,
        headers: {
          ...headers,
          // [HttpHeaders.AUTHORIZATION]: await getAuthorizationHeader(acquireToken),
        },
      })
      if (typeguard) {
        if (typeguard(response.data)) {
          return response.data as ResponseType
        } else {
          throw new Error('Response data typeguard check failed')
        }
      }
      if (validator && !validator(response.data)) {
        throw new Error('Response data validation failed')
      }
      return response.data
    },

    async post<ResponseType>(
      endpointUrl: string,
      requestData?: unknown,
      parameters?: Record<string, string | number | boolean | null>,
      // {
      //   headers,
      //   cancelToken,
      // }: { headers?: Record<string, string>; cancelToken?: CancelToken; onUploadProgress?: OnUploadProgress } = {},
      { headers }: { headers?: Record<string, string> } = {},
    ): Promise<ResponseType> {
      const response = await axiosInstance.post<ResponseType>(endpointUrl, requestData, {
        params: parameters,
        // cancelToken: cancelToken,
        headers: {
          ...headers,
          ...(requestData instanceof FormData && { [HttpHeaders.CONTENT_TYPE]: null }),
          // [HttpHeaders.AUTHORIZATION]: await getAuthorizationHeader(acquireToken),
        },
      })
      return response.data
    },

    async put<ResponseType>(
      endpointUrl: string,
      requestData?: unknown,
      parameters?: Record<string, string | number | boolean | null>,
      // { cancelToken, headers }: { cancelToken?: CancelToken; headers?: Record<string, string> } = {},
      { headers }: { headers?: Record<string, string> } = {},
    ): Promise<ResponseType> {
      const response = await axiosInstance.put<ResponseType>(endpointUrl, requestData, {
        params: parameters,
        // cancelToken: cancelToken,
        headers: {
          ...headers,
          // [HttpHeaders.AUTHORIZATION]: await getAuthorizationHeader(acquireToken),
        },
      })
      return response.data
    },

    async delete<ResponseType>(
      endpointUrl: string,
      parameters?: Record<string, string | number | boolean | null>,
      // { cancelToken, headers }: { cancelToken?: CancelToken; headers?: Record<string, string> } = {},
      { headers }: { headers?: Record<string, string> } = {},
    ): Promise<ResponseType> {
      const response = await axiosInstance.delete<ResponseType>(endpointUrl, {
        params: parameters,
        // cancelToken: cancelToken,
        headers: {
          ...headers,
          // [HttpHeaders.AUTHORIZATION]: await getAuthorizationHeader(acquireToken),
        },
      })
      return response.data
    },

    async mergePatch<ResponseType>(
      endpointUrl: string,
      requestData?: unknown,
      parameters?: Record<string, string | number | boolean | null>,
      // { cancelToken, headers }: { cancelToken?: CancelToken; headers?: Record<string, string> } = {},
      { headers }: { headers?: Record<string, string> } = {},
    ): Promise<ResponseType> {
      const response = await axiosInstance.patch<ResponseType>(endpointUrl, requestData, {
        params: parameters,
        // cancelToken: cancelToken,
        headers: {
          ...headers,
          [HttpHeaders.CONTENT_TYPE]: 'application/merge-patch+json',
          // [HttpHeaders.AUTHORIZATION]: await getAuthorizationHeader(acquireToken),
        },
      })
      return response.data
    },
  }
}

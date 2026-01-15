// TODO: Rethink how validate typeguards are passed (maybe per http-client instance, not per request).
export type ResponseDataTypeguard = <ResponseType>(data: ResponseType) => boolean
export type ResponseDataValidator = <ResponseType>(data: ResponseType) => boolean

// TODO: Add more specific options depended on http-method (later as needed).
export type ApiServiceOptions = {
  headers?: Record<string, string>
}

export type ApiClientOptions = ApiServiceOptions & {
  typeguard?: ResponseDataTypeguard
  validator?: ResponseDataValidator
}

export interface HttpClientConfig {
  baseURL: string
  headers?: Record<string, string>
  withCredentials?: boolean
  // acquireToken: () => Promise<string | undefined>
  timeout?: number
  maxConcurrentRequests?: number
  requestConcurrencyDelay?: number
}

export interface AxiosHttpClientConfig extends Required<HttpClientConfig> {
  getAuthorizationHeader: (acquireToken: () => Promise<string | undefined>) => Promise<string>
}

export interface HttpClientMethods {
  get<ResponseType>(
    endpointUrl: string,
    parameters?: Record<string, string | number | boolean | null>,
    options?: ApiClientOptions,
  ): Promise<ResponseType>
  post<ResponseType>(
    endpointUrl: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestData?: any,
    parameters?: Record<string, string | number | boolean | null>,
    options?: ApiClientOptions,
  ): Promise<ResponseType>
  put<ResponseType>(
    endpointUrl: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestData?: any,
    parameters?: Record<string, string | number | boolean | null>,
    options?: ApiClientOptions,
  ): Promise<ResponseType>
  delete<ResponseType>(
    endpointUrl: string,
    parameters?: Record<string, string | number | boolean | null>,
    options?: ApiClientOptions,
  ): Promise<ResponseType>
  mergePatch<ResponseType>(
    endpointUrl: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestData?: any,
    parameters?: Record<string, string | number | boolean | null>,
    options?: ApiClientOptions,
  ): Promise<ResponseType>
}

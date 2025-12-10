export enum HttpHeaders {
  CONTENT_TYPE = "Content-Type",
  ACCEPT = "Accept",
  // AUTHORIZATION = "AUTHORIZATION",
}

export const REQUEST_TIMEOUT = 5000 as const
export const DEFAULT_MAX_REQUESTS_COUNT = 5 as const
export const REQUEST_CONCURRENCY_DELAY = 50 as const

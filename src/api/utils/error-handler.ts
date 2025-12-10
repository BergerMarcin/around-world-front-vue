import { AxiosError } from 'axios'
import { LogLevel, useLogger } from '@/utils/logger'

const { devLog } = useLogger()

export const errorHandler = <ResponseType>(request: Promise<ResponseType>): Promise<ResponseType> => {
  return request.catch((error: AxiosError) => {
    devLog(LogLevel.error, `API request error from endpoint ${error.config?.baseURL}${error.config?.url}\n`, error.message, error)
    throw error
  })
}

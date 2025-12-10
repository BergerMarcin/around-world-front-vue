import { AxiosError } from 'axios'
import { LogLevel, useLogger } from '@/utils/logger'

export const errorHandler = <ResponseType>(request: Promise<ResponseType>): Promise<ResponseType> => {
  const { devLog } = useLogger()

  return request.catch((error: AxiosError) => {
    devLog(
      LogLevel.error,
      `API request error from endpoint ${error.config?.baseURL}${error.config?.url}\n`,
      error.message,
      '\n',
      error,
    )
    throw error
  })
}

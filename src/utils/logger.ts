import { inject } from 'vue'
import type { ShallowRef } from 'vue'
import { ProviderKey } from '@/types/global.types'

enum LogLevel {
  info = 'info',
  warn = 'warn',
  error = 'error',
}

type DocumentLogStyleType = Record<keyof typeof LogLevel, string>

const DocumentLogStyle: DocumentLogStyleType = {
  info: 'color: black;',
  warn: 'color: orange;',
  error: 'color: red;',
}

const isDevLogsEnabled = (logArgs: unknown[]) =>
  import.meta.env.DEV && import.meta.env.VITE_LOG === 'true' && logArgs.length

const typeGuardLogLevel = (level: unknown): level is LogLevel =>
  typeof level === 'string' && Object.keys(LogLevel).includes(level)

const getLevelLogs = (logArgs: unknown[]): [LogLevel: LogLevel, logs: unknown[]] => {
  let level: LogLevel = LogLevel.info
  let logs: unknown[] = logArgs
  if (typeGuardLogLevel(logArgs[0])) {
    level = logArgs[0]
    logs = logArgs.slice(1)
  }
  return [level, logs]
}

const consoleDevLog = (level: LogLevel, ...logs: unknown[]): void => {
  console[level]('[DEV LOG]: ', ...logs)
}

const documentDevLog = (
  logsContainer: Readonly<ShallowRef<HTMLElement | null>> | undefined,
  level: LogLevel,
  ...logs: unknown[]
): void => {
  const el = logsContainer?.value
  if (el) {
    const style = DocumentLogStyle[level]
    el.innerHTML += ` | <span style="${style}">${logs.join(', ')}</span>`
  }
}

/**
 * Provides a logging utility for development purposes.
 *
 * Example usage:
 * ```typescript
 * const { devLog } = useLogger();
 * devLog(LogLevel.warn, 'This is a warning message');
 * devLog('This is an info message');
 * ```
 */
function useLogger() {
  const logsContainer: Readonly<ShallowRef<HTMLElement | null>> | undefined = inject(ProviderKey.LOGS_CONTAINER)

  const devLog = (...args: unknown[]): void => {
    if (!isDevLogsEnabled(args)) {
      return
    }
    const [level, logs] = getLevelLogs(args)
    consoleDevLog(level, ...logs)
    documentDevLog(logsContainer, level, ...logs)
  }

  return { devLog }
}

export { consoleDevLog, LogLevel, useLogger }

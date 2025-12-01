import { inject } from 'vue'
import type { ShallowRef } from 'vue'

export enum LogLevel {
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

export function useLogger() {
  const logsContainer: Readonly<ShallowRef<HTMLElement | null>> | undefined = inject('logsContainer')

  function typeGuardLogLevel(level: unknown): level is LogLevel {
    return typeof level === 'string' && Object.keys(LogLevel).includes(level)
  }

  function consoleLogHandler(level: LogLevel, ...logs: unknown[]): void {
    console[level]('[DEV LOG]: ', ...logs)
  }

  function documentLogHandler(level: LogLevel, ...logs: unknown[]): void {
    const el = logsContainer?.value
    if (el) {
      const style = DocumentLogStyle[level]
      el.innerHTML += ` | <span style="${style}">${logs.join(', ')}</span>`
    }
  }

  function devLog(...args: any[]): void {
    if (!(import.meta.env.DEV && import.meta.env.VITE_LOG === 'true' && args.length)) {
      return
    }

    let level: LogLevel = LogLevel.info
    let logs: unknown[] = args
    if (typeGuardLogLevel(args[0])) {
      level = args[0]
      logs = args.slice(1)
    }

    consoleLogHandler(level, ...logs)
    documentLogHandler(level, ...logs)
  }

  return { devLog }
}

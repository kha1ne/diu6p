import type { Logger, LoggerConfig } from './loggerTypes';
import { LogLevel } from './loggerTypes';

class AppLogger implements Logger {
  private config: LoggerConfig;

  constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      level: config?.level ?? LogLevel.INFO,
      timestamp: config?.timestamp ?? true,
      prefix: config?.prefix,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.config.level;
  }

  private formatMessage(level: string, message: string, meta?: Record<string, unknown>): string {
    const parts: string[] = [];

    if (this.config.timestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }

    if (this.config.prefix) {
      parts.push(`[${this.config.prefix}]`);
    }

    parts.push(`[${level}]`, message);

    if (meta) {
      parts.push(JSON.stringify(meta));
    }

    return parts.join(' ');
  }

  private writeLog(logFn: (message: string) => void, level: string, message: string, meta?: Record<string, unknown>): void {
    if (!this.shouldLog(LogLevel[level as keyof typeof LogLevel])) {
      return;
    }

    logFn(this.formatMessage(level, message, meta));
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.writeLog(console.error, 'ERROR', message, meta);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.writeLog(console.info, 'INFO', message, meta);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.writeLog(console.debug, 'DEBUG', message, meta);
  }

  child(prefix: string): Logger {
    return new AppLogger({
      level: this.config.level,
      timestamp: this.config.timestamp,
      prefix: this.config.prefix ? `${this.config.prefix}:${prefix}` : prefix,
    });
  }
}

const getLogLevelFromEnv = (level?: string): LogLevel => {
  const levelMap: Record<string, LogLevel> = {
    error: LogLevel.ERROR,
    info: LogLevel.INFO,
    debug: LogLevel.DEBUG,
  };

  return levelMap[level?.toLowerCase() ?? ''] ?? (import.meta.env.PROD ? LogLevel.INFO : LogLevel.DEBUG);
};

const logger = new AppLogger({
  level: getLogLevelFromEnv(import.meta.env.VITE_LOG_LEVEL as string | undefined),
  timestamp: (import.meta.env.VITE_LOG_TIMESTAMP as string | undefined) !== 'false',
});

export { AppLogger, logger };
export type { Logger };

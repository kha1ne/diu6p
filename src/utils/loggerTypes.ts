export enum LogLevel {
  ERROR = 0,
  INFO = 1,
  DEBUG = 2,
}

export interface LoggerConfig {
  level: LogLevel;
  timestamp: boolean;
  prefix?: string;
}

export interface Logger {
  error: (message: string, meta?: Record<string, unknown>) => void;
  info: (message: string, meta?: Record<string, unknown>) => void;
  debug: (message: string, meta?: Record<string, unknown>) => void;
  child: (prefix: string) => Logger;
}

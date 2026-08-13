/**
 * Minimal structured logger. Kept dependency-free for the foundation;
 * can be swapped for pino/winston later without touching call sites.
 */
type LogLevel = 'info' | 'warn' | 'error';

function log(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

  if (level === 'error') {
    console.error(line);
  } else if (level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (message: string) => log('info', message),
  warn: (message: string) => log('warn', message),
  error: (message: string) => log('error', message),
};

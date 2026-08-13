import morgan from 'morgan';
import { isProduction } from '../config/env';

/**
 * Concise request logging in production, verbose developer-friendly
 * logging otherwise. Kept as a single factory so app.ts stays clean.
 */
export const requestLogger = morgan(isProduction ? 'combined' : 'dev');

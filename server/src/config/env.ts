import 'dotenv/config';

type NodeEnv = 'development' | 'production' | 'test';

interface EnvConfig {
  nodeEnv: NodeEnv;
  port: number;
  databaseUrl: string;
  clientUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  cookieName: string;
  passwordResetExpiresMinutes: number;
}

function readEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  nodeEnv: (process.env.NODE_ENV as NodeEnv) ?? 'development',
  port: Number(readEnv('PORT', '5000')),
  databaseUrl: readEnv('DATABASE_URL', 'mongodb://127.0.0.1:27017/lucid-parfums'),
  clientUrl: readEnv('CLIENT_URL', 'http://localhost:5173'),
  jwtSecret: readEnv('JWT_SECRET', 'dev-secret-change-me'),
  jwtExpiresIn: readEnv('JWT_EXPIRES_IN', '7d'),
  cookieName: readEnv('AUTH_COOKIE_NAME', 'lucid_token'),
  passwordResetExpiresMinutes: Number(readEnv('PASSWORD_RESET_EXPIRES_MIN', '60')),
};

export const isProduction = env.nodeEnv === 'production';

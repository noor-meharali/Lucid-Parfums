import { env } from '../config/env';

export interface HealthStatus {
  status: 'ok';
  uptime: number;
  timestamp: string;
  environment: string;
}

export const healthService = {
  getStatus(): HealthStatus {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: env.nodeEnv,
    };
  },
};

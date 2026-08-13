import type { Request, Response } from 'express';
import { healthService } from '../services/health.service';
import { asyncHandler } from '../utils/asyncHandler';
import type { ApiSuccessResponse } from '../types/api';
import type { HealthStatus } from '../services/health.service';

export const getHealth = asyncHandler(async (_req: Request, res: Response) => {
  const data = healthService.getStatus();
  const body: ApiSuccessResponse<HealthStatus> = { success: true, data };
  res.status(200).json(body);
});

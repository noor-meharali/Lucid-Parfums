import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { deliveryMethodService } from '../services/deliveryMethod.service';
import type { ApiSuccessResponse } from '../types/api';
import type { PublicDeliveryMethod } from '../types/deliveryMethod';

export const listDeliveryMethods = asyncHandler(async (_req: Request, res: Response) => {
  const methods = await deliveryMethodService.list();
  const body: ApiSuccessResponse<PublicDeliveryMethod[]> = { success: true, data: methods };
  res.status(200).json(body);
});

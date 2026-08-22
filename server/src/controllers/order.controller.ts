import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { orderService } from '../services/order.service';
import { getStringParam } from '../utils/requestParams';
import type { ApiSuccessResponse, PaginatedResult } from '../types/api';
import type { PublicOrder } from '../types/order';
import type { OrderListQueryInput } from '../validators/order.validator';

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.user!.id, req.body);
  const body: ApiSuccessResponse<PublicOrder> = { success: true, message: 'Order placed.', data: order };
  res.status(201).json(body);
});

export const listOrders = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as OrderListQueryInput;
  const result = await orderService.listForUser(req.user!.id, query.page, query.limit);
  const body: ApiSuccessResponse<PaginatedResult<PublicOrder>> = { success: true, data: result };
  res.status(200).json(body);
});

export const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const orderNumber = getStringParam(req.params.orderNumber, 'orderNumber');
  const order = await orderService.getByOrderNumber(req.user!.id, orderNumber);
  const body: ApiSuccessResponse<PublicOrder> = { success: true, data: order };
  res.status(200).json(body);
});

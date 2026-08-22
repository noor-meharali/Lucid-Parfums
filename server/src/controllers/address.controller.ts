import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { addressService } from '../services/address.service';
import { getStringParam } from '../utils/requestParams';
import type { ApiSuccessResponse } from '../types/api';
import type { PublicAddress } from '../types/address';

export const listAddresses = asyncHandler(async (req: Request, res: Response) => {
  const addresses = await addressService.list(req.user!.id);
  const body: ApiSuccessResponse<PublicAddress[]> = { success: true, data: addresses };
  res.status(200).json(body);
});

export const createAddress = asyncHandler(async (req: Request, res: Response) => {
  const address = await addressService.create(req.user!.id, req.body);
  const body: ApiSuccessResponse<PublicAddress> = { success: true, message: 'Address added.', data: address };
  res.status(201).json(body);
});

export const updateAddress = asyncHandler(async (req: Request, res: Response) => {
  const id = getStringParam(req.params.id, 'id');
  const address = await addressService.update(req.user!.id, id, req.body);
  const body: ApiSuccessResponse<PublicAddress> = { success: true, message: 'Address updated.', data: address };
  res.status(200).json(body);
});

export const deleteAddress = asyncHandler(async (req: Request, res: Response) => {
  const id = getStringParam(req.params.id, 'id');
  await addressService.remove(req.user!.id, id);
  const body: ApiSuccessResponse<null> = { success: true, message: 'Address removed.', data: null };
  res.status(200).json(body);
});

export const setDefaultAddress = asyncHandler(async (req: Request, res: Response) => {
  const id = getStringParam(req.params.id, 'id');
  const address = await addressService.setDefault(req.user!.id, id);
  const body: ApiSuccessResponse<PublicAddress> = { success: true, message: 'Default address updated.', data: address };
  res.status(200).json(body);
});

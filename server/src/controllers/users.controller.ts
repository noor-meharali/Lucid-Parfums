import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { authService } from '../services/auth.service';
import type { ApiSuccessResponse } from '../types/api';
import type { SafeUser } from '../types/user';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const body: ApiSuccessResponse<SafeUser> = { success: true, data: req.user! };
  res.status(200).json(body);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  // req.user!.id — the identity being updated always comes from the
  // authenticated session, never from anything in the request body.
  const user = await authService.updateProfile(req.user!.id, req.body);
  const body: ApiSuccessResponse<SafeUser> = { success: true, message: 'Profile updated.', data: user };
  res.status(200).json(body);
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.changePassword(req.user!.id, req.body);
  const body: ApiSuccessResponse<null> = { success: true, message: 'Password changed.', data: null };
  res.status(200).json(body);
});

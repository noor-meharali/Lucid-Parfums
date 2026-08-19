import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { authService } from '../services/auth.service';
import { setAuthCookie, clearAuthCookie } from '../utils/authCookie';
import type { ApiSuccessResponse } from '../types/api';
import type { SafeUser } from '../types/user';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await authService.register(req.body);
  setAuthCookie(res, token);
  const body: ApiSuccessResponse<SafeUser> = { success: true, message: 'Account created.', data: user };
  res.status(201).json(body);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token } = await authService.login(req.body);
  setAuthCookie(res, token);
  const body: ApiSuccessResponse<SafeUser> = { success: true, message: 'Signed in.', data: user };
  res.status(200).json(body);
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookie(res);
  const body: ApiSuccessResponse<null> = { success: true, message: 'Signed out.', data: null };
  res.status(200).json(body);
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  // requireAuth has already populated req.user before this runs.
  const body: ApiSuccessResponse<SafeUser> = { success: true, data: req.user! };
  res.status(200).json(body);
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body);
  // Identical response whether or not the email has an account.
  const body: ApiSuccessResponse<null> = {
    success: true,
    message: 'If an account exists for that email, a reset link has been sent.',
    data: null,
  };
  res.status(200).json(body);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body);
  const body: ApiSuccessResponse<null> = { success: true, message: 'Password updated. You can now sign in.', data: null };
  res.status(200).json(body);
});

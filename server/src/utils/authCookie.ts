import type { Response } from 'express';
import { env, isProduction } from '../config/env';

const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days, matches the default JWT_EXPIRES_IN

/**
 * Centralizes cookie options so login, register, and logout can
 * never disagree on how the auth cookie is set/cleared. httpOnly
 * keeps it invisible to frontend JavaScript; secure is enforced in
 * production (requires HTTPS); sameSite=lax blocks cross-site POST
 * CSRF while still allowing normal top-level navigation.
 */
export function setAuthCookie(res: Response, token: string): void {
  res.cookie(env.cookieName, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE_MS,
    path: '/',
  });
}

export function clearAuthCookie(res: Response): void {
  res.clearCookie(env.cookieName, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
  });
}

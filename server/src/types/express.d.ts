import type { SafeUser } from './user';

declare global {
  namespace Express {
    interface Request {
      /** Set by requireAuth/requireAdmin once the request's identity is verified. */
      user?: SafeUser;
    }
  }
}

export {};

import type { Role } from '../constants/auth';

/**
 * The user shape used everywhere outside the User model itself —
 * both as the API response DTO and as `req.user`. Never includes
 * passwordHash or reset-token fields.
 */
export interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

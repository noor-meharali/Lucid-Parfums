import type { UserDocument } from '../models/User';
import type { SafeUser } from '../types/user';

export function serializeUser(user: UserDocument): SafeUser {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`.trim(),
    email: user.email,
    phone: user.phone ?? undefined,
    role: user.role,
    avatar: user.avatar ?? undefined,
    isActive: user.isActive,
    emailVerified: user.emailVerified,
    lastLoginAt: user.lastLoginAt?.toISOString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

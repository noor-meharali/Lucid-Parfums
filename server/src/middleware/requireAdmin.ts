import { requireRole } from './requireRole';

/**
 * Requires the authenticated user's current database role to be
 * admin. This replaces the Part 4 stub that rejected every request —
 * the product admin routes now work correctly with zero changes to
 * their own definitions.
 */
export const requireAdmin = requireRole('admin');

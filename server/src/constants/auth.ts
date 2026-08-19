export const ROLES = ['customer', 'admin'] as const;
export type Role = (typeof ROLES)[number];

export const PASSWORD_MIN_LENGTH = 8;
export const BCRYPT_SALT_ROUNDS = 12;

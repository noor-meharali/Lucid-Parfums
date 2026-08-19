import bcrypt from 'bcryptjs';
import { BCRYPT_SALT_ROUNDS } from '../constants/auth';

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_SALT_ROUNDS);
}

export function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

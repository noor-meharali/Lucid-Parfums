import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { signAuthToken } from '../utils/jwt';
import { generateResetToken, hashResetToken } from '../utils/resetToken';
import { serializeUser } from '../utils/serializeUser';
import { emailService } from './email.service';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';
import type { SafeUser } from '../types/user';
import type {
  RegisterInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  ChangePasswordInput,
} from '../validators/auth.validator';

interface AuthResult {
  user: SafeUser;
  token: string;
}

// Same message for "no such account" and "wrong password" so a login
// attempt can't be used to discover which emails have accounts.
const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password.';

export const authService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await User.findOne({ email: input.email });
    if (existing) throw ApiError.badRequest('An account with this email already exists.');

    const passwordHash = await hashPassword(input.password);

    const user = await User.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      passwordHash,
      // role/isActive/emailVerified are never taken from input — every
      // account created here is a customer, regardless of what a
      // crafted request body contains (the validator already strips
      // these keys, this is a second, defense-in-depth layer).
      role: 'customer',
      isActive: true,
      emailVerified: false,
    });

    const token = signAuthToken(user._id.toString());
    return { user: serializeUser(user), token };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await User.findOne({ email: input.email }).select('+passwordHash');
    if (!user) throw ApiError.unauthorized(INVALID_CREDENTIALS_MESSAGE);

    const passwordMatches = await comparePassword(input.password, user.passwordHash);
    if (!passwordMatches) throw ApiError.unauthorized(INVALID_CREDENTIALS_MESSAGE);

    if (!user.isActive) throw ApiError.forbidden('This account is currently unavailable.');

    user.lastLoginAt = new Date();
    await user.save();

    const token = signAuthToken(user._id.toString());
    return { user: serializeUser(user), token };
  },

  async getById(userId: string): Promise<SafeUser> {
    const user = await User.findById(userId);
    if (!user || !user.isActive) throw ApiError.notFound('User not found.');
    return serializeUser(user);
  },

  async updateProfile(userId: string, updates: Partial<{ firstName: string; lastName: string; email: string; phone: string; avatar: string }>): Promise<SafeUser> {
    const user = await User.findById(userId);
    if (!user || !user.isActive) throw ApiError.notFound('User not found.');

    if (updates.email && updates.email !== user.email) {
      const emailTaken = await User.findOne({ email: updates.email, _id: { $ne: user._id } });
      if (emailTaken) throw ApiError.badRequest('An account with this email already exists.');
      user.email = updates.email;
      // Email is an authentication identifier — changing it means
      // it hasn't been re-verified, even though there's no
      // verification-email flow built yet.
      user.emailVerified = false;
    }

    if (updates.firstName !== undefined) user.firstName = updates.firstName;
    if (updates.lastName !== undefined) user.lastName = updates.lastName;
    if (updates.phone !== undefined) user.phone = updates.phone;
    if (updates.avatar !== undefined) user.avatar = updates.avatar;

    await user.save();
    return serializeUser(user);
  },

  async changePassword(userId: string, input: ChangePasswordInput): Promise<void> {
    const user = await User.findById(userId).select('+passwordHash');
    if (!user || !user.isActive) throw ApiError.notFound('User not found.');

    const currentMatches = await comparePassword(input.currentPassword, user.passwordHash);
    if (!currentMatches) throw ApiError.badRequest('Current password is incorrect.');

    user.passwordHash = await hashPassword(input.newPassword);
    await user.save();
  },

  async forgotPassword(input: ForgotPasswordInput): Promise<void> {
    const user = await User.findOne({ email: input.email });

    // Always behave identically whether or not the account exists —
    // the response never reveals which is the case.
    if (!user || !user.isActive) return;

    const { rawToken, tokenHash } = generateResetToken();
    user.passwordResetTokenHash = tokenHash;
    user.passwordResetExpiresAt = new Date(Date.now() + env.passwordResetExpiresMinutes * 60 * 1000);
    await user.save();

    const resetUrl = `${env.clientUrl}/reset-password?token=${rawToken}`;
    await emailService.sendPasswordResetEmail(user.email, resetUrl);
  },

  async resetPassword(input: ResetPasswordInput): Promise<void> {
    const tokenHash = hashResetToken(input.token);

    const user = await User.findOne({
      passwordResetTokenHash: tokenHash,
      passwordResetExpiresAt: { $gt: new Date() },
    }).select('+passwordResetTokenHash +passwordResetExpiresAt');

    if (!user) throw ApiError.badRequest('This password reset link is invalid or has expired.');

    user.passwordHash = await hashPassword(input.newPassword);
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save();
  },
};

import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '../constants/auth';

const emailSchema = z.string().trim().toLowerCase().email('Please enter a valid email address.');
const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`)
  .max(128);

// Deliberately excludes role/isActive/emailVerified — every account
// created through this endpoint is a customer, full stop. Nothing in
// this schema can ever be used to self-assign a different role.
export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, 'First name is required.').max(60),
    lastName: z.string().trim().min(1, 'Last name is required.').max(60),
    email: emailSchema,
    phone: z.string().trim().max(30).optional(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required.'),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().trim().min(1),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match.',
    path: ['confirmNewPassword'],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match.',
    path: ['confirmNewPassword'],
  });

// Deliberately excludes role/isActive/passwordHash — a customer can
// never escalate their own role or reactivate/deactivate themselves
// through a profile update, no matter what extra fields they send
// (validate() strips anything not in this schema).
export const updateProfileSchema = z.object({
  firstName: z.string().trim().min(1).max(60).optional(),
  lastName: z.string().trim().min(1).max(60).optional(),
  email: emailSchema.optional(),
  phone: z.string().trim().max(30).optional(),
  avatar: z.string().trim().max(2000).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

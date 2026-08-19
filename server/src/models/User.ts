import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
import { ROLES } from '../constants/auth';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, maxlength: 254 },
    phone: { type: String, trim: true, maxlength: 30 },

    // Never selected by default — every query that needs it must opt
    // in with .select('+passwordHash'), so a stray `find()` can never
    // accidentally leak it into an API response.
    passwordHash: { type: String, required: true, select: false },

    role: { type: String, enum: ROLES, default: 'customer', required: true },
    avatar: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date },

    // Only the hash is stored — the raw token is emailed/shown to the
    // user once and never persisted. Also select:false for the same
    // reason as passwordHash.
    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpiresAt: { type: Date, select: false },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.virtual('name').get(function (this: { firstName: string; lastName: string }) {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

export type UserAttrs = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<UserAttrs>;

export const User = model('User', userSchema);

import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    addressLine1: { type: String, required: true, trim: true, maxlength: 200 },
    addressLine2: { type: String, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    province: { type: String, required: true, trim: true, maxlength: 100 },
    postalCode: { type: String, required: true, trim: true, maxlength: 20 },
    // Kept flexible beyond one country per Part 7's spec — free text
    // rather than a fixed enum, so it doesn't need a code change to
    // support a new country later.
    country: { type: String, required: true, trim: true, maxlength: 100 },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

addressSchema.index({ user: 1 });

export type AddressAttrs = InferSchemaType<typeof addressSchema>;
export type AddressDocument = HydratedDocument<AddressAttrs>;

export const Address = model('Address', addressSchema);

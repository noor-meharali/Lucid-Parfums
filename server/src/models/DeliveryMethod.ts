import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const deliveryMethodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    priceCents: { type: Number, required: true, min: 0 },
    estimatedDays: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

/**
 * Shipping prices live here — business configuration, read by the
 * checkout API — rather than hardcoded in frontend components. An
 * admin CRUD UI for this is a later part; for now it's seeded.
 */
export type DeliveryMethodAttrs = InferSchemaType<typeof deliveryMethodSchema>;
export type DeliveryMethodDocument = HydratedDocument<DeliveryMethodAttrs>;

export const DeliveryMethod = model('DeliveryMethod', deliveryMethodSchema);

import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
import { ORDER_STATUSES, PAYMENT_STATUSES, PAYMENT_METHODS } from '../constants/order';

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    // Snapshots: an order must keep reading correctly even if the
    // product is later renamed, re-priced, re-photographed, or archived.
    nameSnapshot: { type: String, required: true },
    imageSnapshot: { type: String, required: true },
    selectedSize: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPriceCents: { type: Number, required: true, min: 0 },
    subtotalCents: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const shippingAddressSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const deliveryMethodSnapshotSchema = new Schema(
  {
    name: { type: String, required: true },
    priceCents: { type: Number, required: true, min: 0 },
    estimatedDays: { type: String },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String, required: true, unique: true },

    items: { type: [orderItemSchema], required: true, validate: (v: unknown[]) => v.length > 0 },

    shippingAddress: { type: shippingAddressSchema, required: true },
    deliveryMethod: { type: deliveryMethodSnapshotSchema, required: true },

    subtotalCents: { type: Number, required: true, min: 0 },
    shippingCostCents: { type: Number, required: true, min: 0 },
    discountCents: { type: Number, required: true, min: 0, default: 0 },
    totalCents: { type: Number, required: true, min: 0 },

    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
    // Only ever set to 'paid' by a real payment provider's verified
    // callback/webhook once one exists — never by a frontend request.
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, default: 'pending' },
    orderStatus: { type: String, enum: ORDER_STATUSES, default: 'pending' },
  },
  { timestamps: true },
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 }, { unique: true });

export type OrderAttrs = InferSchemaType<typeof orderSchema>;
export type OrderDocument = HydratedDocument<OrderAttrs>;

export const Order = model('Order', orderSchema);

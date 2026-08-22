import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  selectedSize: { type: String, trim: true },
  // Unit price *at the time this item was added* — display-only, so
  // the cart page can show a stable price while browsing. Never the
  // source of truth: checkout always re-reads the live Product price.
  priceCentsSnapshot: { type: Number, required: true, min: 0 },
});

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export type CartAttrs = InferSchemaType<typeof cartSchema>;
export type CartDocument = HydratedDocument<CartAttrs>;

export const Cart = model('Cart', cartSchema);

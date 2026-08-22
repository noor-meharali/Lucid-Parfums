import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const wishlistSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    products: { type: [{ type: Schema.Types.ObjectId, ref: 'Product' }], default: [] },
  },
  { timestamps: true },
);

export type WishlistAttrs = InferSchemaType<typeof wishlistSchema>;
export type WishlistDocument = HydratedDocument<WishlistAttrs>;

export const Wishlist = model('Wishlist', wishlistSchema);

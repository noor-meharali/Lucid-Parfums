import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },

    // `user`/`order` are refs for when authentication (Part 6) and
    // orders exist — left optional for now so seeded demo reviews
    // and reviews written before a customer account system don't
    // need a real user/order to point at. Once auth exists, review
    // creation should always set `user`, and the partial unique index
    // below starts enforcing one review per user per product.
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },

    // Denormalized display name so reviews render without needing to
    // populate/join a User document — also what seeded demo reviews use.
    authorName: { type: String, required: true, trim: true, maxlength: 80 },

    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, minlength: 1, maxlength: 1000 },
    verifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true },
);

reviewSchema.index({ product: 1, createdAt: -1 });

// Prevents duplicate reviews per user per product once every review
// has a real `user` — reviews without one (e.g. seed data, or any
// written before auth existed) are excluded from the uniqueness
// check rather than colliding with each other.
reviewSchema.index(
  { product: 1, user: 1 },
  { unique: true, partialFilterExpression: { user: { $exists: true } } },
);

export type ReviewAttrs = InferSchemaType<typeof reviewSchema>;
export type ReviewDocument = HydratedDocument<ReviewAttrs>;

export const Review = model('Review', reviewSchema);

import { Schema, model, type InferSchemaType, type HydratedDocument } from 'mongoose';
import { GENDERS, FRAGRANCE_FAMILIES } from '../constants/product';

const sizeSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    volumeMl: { type: Number, required: true, min: 1 },
    priceCents: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true },
    description: { type: String, required: true, trim: true, maxlength: 4000 },
    category: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: GENDERS },
    brand: { type: String, required: true, trim: true, default: 'Lucid Parfums' },

    priceCents: { type: Number, required: true, min: 0 },
    salePriceCents: { type: Number, min: 0 },
    sku: { type: String, required: true, trim: true, uppercase: true, unique: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    sizes: { type: [sizeSchema], default: [] },

    images: { type: [String], default: [] },
    primaryImage: { type: String, required: true },

    fragranceFamily: { type: String, required: true, enum: FRAGRANCE_FAMILIES },
    topNotes: { type: [String], default: [] },
    heartNotes: { type: [String], default: [] },
    baseNotes: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },

    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, min: 0, default: 0 },

    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Full-text search across the fields customers actually search by.
productSchema.index({
  name: 'text',
  description: 'text',
  category: 'text',
  fragranceFamily: 'text',
  topNotes: 'text',
  heartNotes: 'text',
  baseNotes: 'text',
});

// Supports the shop/collection filter + listing queries efficiently.
productSchema.index({ isActive: 1, gender: 1, category: 1, fragranceFamily: 1 });
productSchema.index({ isActive: 1, featured: 1 });
productSchema.index({ isActive: 1, bestSeller: 1 });
productSchema.index({ isActive: 1, newArrival: 1 });
productSchema.index({ priceCents: 1 });
productSchema.index({ rating: -1 });

export type ProductAttrs = InferSchemaType<typeof productSchema>;
export type ProductDocument = HydratedDocument<ProductAttrs>;

export const Product = model('Product', productSchema);

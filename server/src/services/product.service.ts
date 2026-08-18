import type { QueryFilter, SortOrder } from 'mongoose';
import { Product, type ProductAttrs } from '../models/Product';
import { serializeProduct } from '../utils/serializeProduct';
import { ApiError } from '../utils/ApiError';
import type { PublicProduct, ProductListQuery } from '../types/product';
import type { PaginatedResult } from '../types/api';
import type { CreateProductInput, UpdateProductInput } from '../validators/product.validator';

function buildFilter(query: ProductListQuery): QueryFilter<ProductAttrs> {
  const filter: QueryFilter<ProductAttrs> = { isActive: true };

  if (query.gender) filter.gender = query.gender;
  if (query.category) filter.category = query.category;
  if (query.fragranceFamily) filter.fragranceFamily = query.fragranceFamily;

  if (query.minPriceCents !== undefined || query.maxPriceCents !== undefined) {
    filter.priceCents = {};
    if (query.minPriceCents !== undefined) filter.priceCents.$gte = query.minPriceCents;
    if (query.maxPriceCents !== undefined) filter.priceCents.$lte = query.maxPriceCents;
  }

  if (query.inStockOnly) filter.stock = { $gt: 0 };
  if (query.featured) filter.featured = true;
  if (query.bestSeller) filter.bestSeller = true;
  if (query.newArrival) filter.newArrival = true;

  if (query.search) filter.$text = { $search: query.search };

  return filter;
}

function buildSort(sort: ProductListQuery['sort']): Record<string, SortOrder> {
  switch (sort) {
    case 'price-low':
      return { priceCents: 1 };
    case 'price-high':
      return { priceCents: -1 };
    case 'rating':
      return { rating: -1, reviewCount: -1 };
    case 'popularity':
      return { reviewCount: -1, rating: -1 };
    case 'newest':
    default:
      return { createdAt: -1 };
  }
}

export const productService = {
  async list(query: ProductListQuery): Promise<PaginatedResult<PublicProduct>> {
    const filter = buildFilter(query);
    const sort = buildSort(query.sort);
    const skip = (query.page - 1) * query.limit;

    const [docs, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(query.limit),
      Product.countDocuments(filter),
    ]);

    return {
      items: docs.map(serializeProduct),
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / query.limit)),
    };
  },

  async getBySlug(slug: string): Promise<PublicProduct> {
    const doc = await Product.findOne({ slug, isActive: true });
    if (!doc) throw ApiError.notFound(`No product found for slug "${slug}"`);
    return serializeProduct(doc);
  },

  /**
   * Picks related products by relevance rather than randomly:
   * fragrance family + gender match first, then fragrance family
   * alone, then same category, broadening only as needed to fill
   * `limit` — so a product never ends up "related" to itself or to
   * something with nothing in common.
   */
  async getRelated(product: PublicProduct, limit = 4): Promise<PublicProduct[]> {
    const excludeSelf = { _id: { $ne: product.id }, isActive: true };
    const seen = new Set<string>();
    const results: PublicProduct[] = [];

    const tiers: QueryFilter<ProductAttrs>[] = [
      { ...excludeSelf, fragranceFamily: product.fragranceFamily, gender: product.gender },
      { ...excludeSelf, fragranceFamily: product.fragranceFamily },
      { ...excludeSelf, category: product.category, gender: product.gender },
      { ...excludeSelf, gender: product.gender },
    ];

    for (const tier of tiers) {
      if (results.length >= limit) break;

      const docs = await Product.find(tier)
        .sort({ rating: -1, reviewCount: -1 })
        .limit(limit);

      for (const doc of docs) {
        const id = doc._id.toString();
        if (seen.has(id) || results.length >= limit) continue;
        seen.add(id);
        results.push(serializeProduct(doc));
      }
    }

    return results;
  },

  async create(input: CreateProductInput): Promise<PublicProduct> {
    const existingSlug = await Product.findOne({ slug: input.slug });
    if (existingSlug) throw ApiError.badRequest(`A product with slug "${input.slug}" already exists`);

    const existingSku = await Product.findOne({ sku: input.sku.toUpperCase() });
    if (existingSku) throw ApiError.badRequest(`A product with SKU "${input.sku}" already exists`);

    const doc = await Product.create(input);
    return serializeProduct(doc);
  },

  async update(id: string, input: UpdateProductInput): Promise<PublicProduct> {
    const doc = await Product.findByIdAndUpdate(id, input, { new: true, runValidators: true });
    if (!doc) throw ApiError.notFound('Product not found');
    return serializeProduct(doc);
  },

  /** Soft-delete: archives the product rather than removing it from the database. */
  async archive(id: string): Promise<PublicProduct> {
    const doc = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!doc) throw ApiError.notFound('Product not found');
    return serializeProduct(doc);
  },
};

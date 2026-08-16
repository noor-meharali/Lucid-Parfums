import { LOW_STOCK_THRESHOLD } from '../constants/product';
import type { ProductDocument } from '../models/Product';
import type { PublicProduct, ProductBadge, StockState } from '../types/product';

function resolveStockState(stock: number): StockState {
  if (stock <= 0) return 'outOfStock';
  if (stock <= LOW_STOCK_THRESHOLD) return 'lowStock';
  return 'inStock';
}

function resolveBadges(product: ProductDocument, stockState: StockState): ProductBadge[] {
  const badges: ProductBadge[] = [];

  if (product.newArrival) badges.push('new');
  if (product.bestSeller) badges.push('bestseller');
  if (product.salePriceCents !== undefined && product.salePriceCents !== null) badges.push('sale');
  if (product.featured) badges.push('featured');
  if (stockState === 'outOfStock') badges.push('outOfStock');
  else if (stockState === 'lowStock') badges.push('lowStock');
  if (product.gender === 'men') badges.push('men');
  if (product.gender === 'women') badges.push('women');
  if (product.gender === 'unisex') badges.push('unisex');

  return badges;
}

/**
 * Converts a Mongoose Product document into the DTO the frontend
 * consumes. Keeps derived fields (stock state, badges, image
 * fallbacks) out of the database and computed consistently in one
 * place instead of duplicated across controllers.
 */
export function serializeProduct(product: ProductDocument): PublicProduct {
  const stockState = resolveStockState(product.stock);

  return {
    id: product._id.toString(),
    slug: product.slug,
    name: product.name,
    description: product.description,
    category: product.category,
    gender: product.gender,
    brand: product.brand,
    priceCents: product.priceCents,
    salePriceCents: product.salePriceCents ?? undefined,
    sku: product.sku,
    stock: stockState,
    stockCount: product.stock,
    sizes: product.sizes.map((size) => ({
      label: size.label,
      volumeMl: size.volumeMl,
      priceCents: size.priceCents,
      stock: size.stock,
    })),
    images: product.images,
    imageUrl: product.primaryImage,
    imageAlt: `${product.name} — ${product.category}`,
    fragranceFamily: product.fragranceFamily,
    topNotes: product.topNotes,
    heartNotes: product.heartNotes,
    baseNotes: product.baseNotes,
    ingredients: product.ingredients,
    rating: product.rating,
    reviewCount: product.reviewCount,
    featured: product.featured,
    bestSeller: product.bestSeller,
    newArrival: product.newArrival,
    badges: resolveBadges(product, stockState),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { getStringParam } from '../utils/requestParams';
import { productService } from '../services/product.service';
import type { ApiSuccessResponse, PaginatedResult } from '../types/api';
import type { PublicProduct, ProductListQuery } from '../types/product';
import type { ProductListQueryInput } from '../validators/product.validator';

function toServiceQuery(query: ProductListQueryInput): ProductListQuery {
  return {
    page: query.page,
    limit: query.limit,
    gender: query.gender,
    category: query.category,
    fragranceFamily: query.fragranceFamily,
    minPriceCents: query.minPrice,
    maxPriceCents: query.maxPrice,
    inStockOnly: query.inStock,
    featured: query.featured,
    bestSeller: query.bestSeller,
    newArrival: query.newArrival,
    search: query.search,
    sort: query.sort,
  };
}

export const listProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = toServiceQuery(req.query as unknown as ProductListQueryInput);
  const result = await productService.list(query);
  const body: ApiSuccessResponse<PaginatedResult<PublicProduct>> = { success: true, data: result };
  res.status(200).json(body);
});

export const getProductBySlug = asyncHandler(async (req: Request, res: Response) => {
  const slug = getStringParam(req.params.slug, 'slug');
  const product = await productService.getBySlug(slug);
  const body: ApiSuccessResponse<PublicProduct> = { success: true, data: product };
  res.status(200).json(body);
});

export const getRelatedProducts = asyncHandler(async (req: Request, res: Response) => {
  const slug = getStringParam(req.params.slug, 'slug');
  const product = await productService.getBySlug(slug);
  const related = await productService.getRelated(product, 4);
  const body: ApiSuccessResponse<PublicProduct[]> = { success: true, data: related };
  res.status(200).json(body);
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.create(req.body);
  const body: ApiSuccessResponse<PublicProduct> = { success: true, message: 'Product created', data: product };
  res.status(201).json(body);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = getStringParam(req.params.id, 'id');
  const product = await productService.update(id, req.body);
  const body: ApiSuccessResponse<PublicProduct> = { success: true, message: 'Product updated', data: product };
  res.status(200).json(body);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const id = getStringParam(req.params.id, 'id');
  const product = await productService.archive(id);
  const body: ApiSuccessResponse<PublicProduct> = { success: true, message: 'Product archived', data: product };
  res.status(200).json(body);
});

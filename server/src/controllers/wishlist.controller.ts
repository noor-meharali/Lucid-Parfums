import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { wishlistService } from '../services/wishlist.service';
import { getStringParam } from '../utils/requestParams';
import type { ApiSuccessResponse } from '../types/api';
import type { PublicWishlist } from '../types/wishlist';

function respond(res: Response, message: string | undefined, wishlist: PublicWishlist) {
  const body: ApiSuccessResponse<PublicWishlist> = { success: true, message, data: wishlist };
  res.status(200).json(body);
}

export const getWishlist = asyncHandler(async (req: Request, res: Response) => {
  const wishlist = await wishlistService.get(req.user!.id);
  respond(res, undefined, wishlist);
});

export const addToWishlist = asyncHandler(async (req: Request, res: Response) => {
  const productId = getStringParam(req.params.productId, 'productId');
  const wishlist = await wishlistService.addProduct(req.user!.id, productId);
  respond(res, 'Added to wishlist.', wishlist);
});

export const removeFromWishlist = asyncHandler(async (req: Request, res: Response) => {
  const productId = getStringParam(req.params.productId, 'productId');
  const wishlist = await wishlistService.removeProduct(req.user!.id, productId);
  respond(res, 'Removed from wishlist.', wishlist);
});

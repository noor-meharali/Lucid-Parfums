import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { cartService } from '../services/cart.service';
import { getStringParam } from '../utils/requestParams';
import type { ApiSuccessResponse } from '../types/api';
import type { PublicCart } from '../types/cart';

function respond(res: Response, status: number, message: string | undefined, cart: PublicCart) {
  const body: ApiSuccessResponse<PublicCart> = { success: true, message, data: cart };
  res.status(status).json(body);
}

export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.getCart(req.user!.id);
  respond(res, 200, undefined, cart);
});

export const addCartItem = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity, selectedSize } = req.body;
  const cart = await cartService.addItem(req.user!.id, productId, quantity, selectedSize);
  respond(res, 201, 'Added to cart.', cart);
});

export const updateCartItem = asyncHandler(async (req: Request, res: Response) => {
  const itemId = getStringParam(req.params.itemId, 'itemId');
  const { quantity } = req.body;
  const cart = await cartService.updateItemQuantity(req.user!.id, itemId, quantity);
  respond(res, 200, 'Cart updated.', cart);
});

export const removeCartItem = asyncHandler(async (req: Request, res: Response) => {
  const itemId = getStringParam(req.params.itemId, 'itemId');
  const cart = await cartService.removeItem(req.user!.id, itemId);
  respond(res, 200, 'Removed from cart.', cart);
});

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await cartService.clearCart(req.user!.id);
  respond(res, 200, 'Cart cleared.', cart);
});

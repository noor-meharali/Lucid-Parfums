import { Wishlist } from '../models/Wishlist';
import { Product } from '../models/Product';
import { serializeProduct } from '../utils/serializeProduct';
import { ApiError } from '../utils/ApiError';
import type { PublicWishlist } from '../types/wishlist';

async function getOrCreate(userId: string) {
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
}

async function serialize(wishlist: Awaited<ReturnType<typeof getOrCreate>>): Promise<PublicWishlist> {
  const products = await Product.find({ _id: { $in: wishlist.products }, isActive: true });
  return {
    id: wishlist._id.toString(),
    products: products.map(serializeProduct),
  };
}

export const wishlistService = {
  async get(userId: string): Promise<PublicWishlist> {
    const wishlist = await getOrCreate(userId);
    return serialize(wishlist);
  },

  async addProduct(userId: string, productId: string): Promise<PublicWishlist> {
    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) throw ApiError.notFound('Product not found.');

    const wishlist = await getOrCreate(userId);
    // $addToSet at the query level would be more atomic, but we need
    // the hydrated doc back either way, and a duplicate add here is
    // harmless (Mongoose still de-dupes with addToSet below).
    await Wishlist.updateOne({ _id: wishlist._id }, { $addToSet: { products: product._id } });

    const updated = await getOrCreate(userId);
    return serialize(updated);
  },

  async removeProduct(userId: string, productId: string): Promise<PublicWishlist> {
    const wishlist = await getOrCreate(userId);
    await Wishlist.updateOne({ _id: wishlist._id }, { $pull: { products: productId } });

    const updated = await getOrCreate(userId);
    return serialize(updated);
  },
};

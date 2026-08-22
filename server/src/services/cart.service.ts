import { Cart } from '../models/Cart';
import { Product, type ProductDocument } from '../models/Product';
import { ApiError } from '../utils/ApiError';
import type { PublicCart, PublicCartItem } from '../types/cart';

/** Live price for a cart line: the size's price if one was selected, else the product's current (sale) price. */
function resolveUnitPriceCents(product: ProductDocument, selectedSize: string | undefined): number {
  if (selectedSize) {
    const size = product.sizes.find((s) => s.label === selectedSize);
    if (size) return size.priceCents;
  }
  return product.salePriceCents ?? product.priceCents;
}

function resolveAvailableStock(product: ProductDocument, selectedSize: string | undefined): number {
  if (selectedSize) {
    const size = product.sizes.find((s) => s.label === selectedSize);
    return size ? size.stock : 0;
  }
  return product.stock;
}

async function getOrCreateCart(userId: string) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

/**
 * Builds the response DTO by re-reading every product live — prices,
 * stock, and active status shown to the customer are always current,
 * never the stale snapshot taken when the item was added to the cart.
 */
async function serialize(cartDoc: Awaited<ReturnType<typeof getOrCreateCart>>): Promise<PublicCart> {
  const productIds = cartDoc.items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  const items: PublicCartItem[] = cartDoc.items.map((item) => {
    const product = productMap.get(item.product.toString());
    const isActive = Boolean(product?.isActive);
    const unitPriceCents = product ? resolveUnitPriceCents(product, item.selectedSize ?? undefined) : item.priceCentsSnapshot;
    const availableStock = product ? resolveAvailableStock(product, item.selectedSize ?? undefined) : 0;

    return {
      id: item._id!.toString(),
      productId: item.product.toString(),
      slug: product?.slug ?? '',
      name: product?.name ?? 'Product no longer available',
      imageUrl: product?.primaryImage ?? '',
      imageAlt: product?.name ?? '',
      selectedSize: item.selectedSize ?? undefined,
      quantity: item.quantity,
      unitPriceCents,
      subtotalCents: unitPriceCents * item.quantity,
      availableStock,
      isActive,
    };
  });

  // Items whose product is gone/inactive or fully out of stock still
  // show (with a clear flag) so the customer can see what happened
  // rather than have things silently vanish, but they never count
  // toward the total the customer is charged.
  const chargeableItems = items.filter((item) => item.isActive && item.availableStock > 0);

  return {
    id: cartDoc._id.toString(),
    items,
    itemCount: chargeableItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotalCents: chargeableItems.reduce((sum, item) => sum + item.subtotalCents, 0),
  };
}

export const cartService = {
  async getCart(userId: string): Promise<PublicCart> {
    const cart = await getOrCreateCart(userId);
    return serialize(cart);
  },

  async addItem(userId: string, productId: string, quantity: number, selectedSize: string | undefined): Promise<PublicCart> {
    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) throw ApiError.notFound('Product not found.');

    if (product.sizes.length > 0) {
      if (!selectedSize) throw ApiError.badRequest('Please select a size.');
      const size = product.sizes.find((s) => s.label === selectedSize);
      if (!size) throw ApiError.badRequest('The selected size is not available for this product.');
      if (size.stock < quantity) throw ApiError.badRequest(`Only ${size.stock} left in that size.`);
    } else {
      if (product.stock < quantity) throw ApiError.badRequest(`Only ${product.stock} left in stock.`);
    }

    const cart = await getOrCreateCart(userId);
    const unitPriceCents = resolveUnitPriceCents(product, selectedSize);

    const existing = cart.items.find(
      (item) => item.product.toString() === productId && item.selectedSize === selectedSize,
    );

    if (existing) {
      const maxAvailable = resolveAvailableStock(product, selectedSize);
      const nextQuantity = existing.quantity + quantity;
      if (nextQuantity > maxAvailable) {
        throw ApiError.badRequest(`Only ${maxAvailable} available — you already have ${existing.quantity} in your cart.`);
      }
      existing.quantity = nextQuantity;
      existing.priceCentsSnapshot = unitPriceCents;
    } else {
      cart.items.push({ product: product._id, quantity, selectedSize, priceCentsSnapshot: unitPriceCents });
    }

    await cart.save();
    return serialize(cart);
  },

  async updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<PublicCart> {
    const cart = await getOrCreateCart(userId);
    const item = cart.items.find((i) => i._id!.toString() === itemId);
    if (!item) throw ApiError.notFound('Cart item not found.');

    const product = await Product.findOne({ _id: item.product, isActive: true });
    if (!product) throw ApiError.badRequest('This product is no longer available.');

    const availableStock = resolveAvailableStock(product, item.selectedSize ?? undefined);
    if (quantity > availableStock) {
      throw ApiError.badRequest(`Only ${availableStock} available.`);
    }

    item.quantity = quantity;
    await cart.save();
    return serialize(cart);
  },

  async removeItem(userId: string, itemId: string): Promise<PublicCart> {
    const cart = await getOrCreateCart(userId);
    const item = cart.items.find((i) => i._id!.toString() === itemId);
    if (!item) throw ApiError.notFound('Cart item not found.');

    // Mongoose subdocument removal — pull by _id rather than splice,
    // so this is correct regardless of array index.
    cart.items.pull(itemId);
    await cart.save();
    return serialize(cart);
  },

  async clearCart(userId: string): Promise<PublicCart> {
    const cart = await getOrCreateCart(userId);
    cart.items.splice(0, cart.items.length);
    await cart.save();
    return serialize(cart);
  },
};

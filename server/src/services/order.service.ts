import mongoose from 'mongoose';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';
import { Order, type OrderDocument } from '../models/Order';
import { addressService } from './address.service';
import { deliveryMethodService } from './deliveryMethod.service';
import { nextOrderNumber } from '../utils/orderNumber';
import { serializeOrder } from '../utils/serializeOrder';
import { ApiError } from '../utils/ApiError';
import type { PublicOrder } from '../types/order';
import type { PaginatedResult } from '../types/api';
import type { CreateOrderInput } from '../validators/order.validator';
import type { AddressDocument } from '../models/Address';

function resolveUnitPriceCents(product: { priceCents: number; salePriceCents?: number | null; sizes: { label: string; priceCents: number }[] }, selectedSize: string | undefined): number {
  if (selectedSize) {
    const size = product.sizes.find((s) => s.label === selectedSize);
    if (size) return size.priceCents;
  }
  return product.salePriceCents ?? product.priceCents;
}

export const orderService = {
  async createOrder(userId: string, input: CreateOrderInput): Promise<PublicOrder> {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      throw ApiError.badRequest('Your cart is empty.');
    }

    // Address and delivery method are read/validated (and, for a new
    // inline address, created) before the transaction — neither
    // involves stock, so there's nothing here that needs rolling back.
    const address: AddressDocument = input.addressId
      ? await addressService.getOwned(userId, input.addressId)
      : await (async () => {
          const created = await addressService.create(userId, input.address!);
          return addressService.getOwned(userId, created.id);
        })();

    const deliveryMethod = await deliveryMethodService.getActiveById(input.deliveryMethodId);

    const session = await mongoose.startSession();
    let order: OrderDocument | undefined;

    try {
      await session.withTransaction(async () => {
        const orderItems: {
          product: mongoose.Types.ObjectId;
          nameSnapshot: string;
          imageSnapshot: string;
          selectedSize?: string;
          quantity: number;
          unitPriceCents: number;
          subtotalCents: number;
        }[] = [];

        for (const cartItem of cart.items) {
          const product = await Product.findOne({ _id: cartItem.product, isActive: true }).session(session);
          if (!product) {
            throw ApiError.badRequest('One of the items in your cart is no longer available. Please review your cart.');
          }

          const selectedSize = cartItem.selectedSize ?? undefined;
          const unitPriceCents = resolveUnitPriceCents(product, selectedSize);

          // Atomic, conditional stock decrement: only succeeds if the
          // current stock is still enough. If two checkouts race for
          // the last unit, exactly one of these matches — the loser
          // throws below and the whole transaction (including any
          // stock already decremented earlier in this same order)
          // rolls back, so nothing oversells.
          const filter = selectedSize
            ? { _id: product._id, 'sizes.label': selectedSize, 'sizes.stock': { $gte: cartItem.quantity } }
            : { _id: product._id, stock: { $gte: cartItem.quantity } };
          const update = selectedSize
            ? { $inc: { 'sizes.$[size].stock': -cartItem.quantity } }
            : { $inc: { stock: -cartItem.quantity } };
          const options = selectedSize
            ? { session, arrayFilters: [{ 'size.label': selectedSize }] }
            : { session };

          const result = await Product.updateOne(filter, update, options);
          if (result.matchedCount === 0) {
            throw ApiError.badRequest(
              `"${product.name}"${selectedSize ? ` (${selectedSize})` : ''} no longer has enough stock. Please update your cart.`,
            );
          }

          orderItems.push({
            product: product._id,
            nameSnapshot: product.name,
            imageSnapshot: product.primaryImage,
            selectedSize,
            quantity: cartItem.quantity,
            unitPriceCents,
            subtotalCents: unitPriceCents * cartItem.quantity,
          });
        }

        const subtotalCents = orderItems.reduce((sum, item) => sum + item.subtotalCents, 0);
        const shippingCostCents = deliveryMethod.priceCents;
        // No coupon/promotion system exists yet — this is always 0,
        // never a value invented for or trusted from the frontend.
        const discountCents = 0;
        const totalCents = subtotalCents + shippingCostCents - discountCents;

        const orderNumber = await nextOrderNumber(session);

        const createdDocs = await Order.create(
          [
            {
              user: userId,
              orderNumber,
              items: orderItems,
              shippingAddress: {
                firstName: address.firstName,
                lastName: address.lastName,
                phone: address.phone,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                city: address.city,
                province: address.province,
                postalCode: address.postalCode,
                country: address.country,
              },
              deliveryMethod: {
                name: deliveryMethod.name,
                priceCents: deliveryMethod.priceCents,
                estimatedDays: deliveryMethod.estimatedDays,
              },
              subtotalCents,
              shippingCostCents,
              discountCents,
              totalCents,
              paymentMethod: input.paymentMethod,
              // Never 'paid' from a frontend request — only a real
              // payment provider's verified callback can set this,
              // and that integration doesn't exist yet.
              paymentStatus: 'pending',
              orderStatus: 'pending',
            },
          ],
          { session },
        );
        order = createdDocs[0];

        cart.items.splice(0, cart.items.length);
        await cart.save({ session });
      });
    } finally {
      await session.endSession();
    }

    return serializeOrder(order!);
  },

  async listForUser(userId: string, page: number, limit: number): Promise<PaginatedResult<PublicOrder>> {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      Order.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments({ user: userId }),
    ]);

    return {
      items: docs.map(serializeOrder),
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  },

  /** Ownership enforced in the query itself — a wrong order number for this user simply doesn't match, never a 403 that confirms the order exists. */
  async getByOrderNumber(userId: string, orderNumber: string): Promise<PublicOrder> {
    const order = await Order.findOne({ orderNumber, user: userId });
    if (!order) throw ApiError.notFound('Order not found.');
    return serializeOrder(order);
  },
};

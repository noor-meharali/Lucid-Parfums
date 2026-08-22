import type { OrderDocument } from '../models/Order';
import type { PublicOrder } from '../types/order';

export function serializeOrder(order: OrderDocument): PublicOrder {
  return {
    id: order._id.toString(),
    orderNumber: order.orderNumber,
    items: order.items.map((item) => ({
      productId: item.product.toString(),
      nameSnapshot: item.nameSnapshot,
      imageSnapshot: item.imageSnapshot,
      selectedSize: item.selectedSize ?? undefined,
      quantity: item.quantity,
      unitPriceCents: item.unitPriceCents,
      subtotalCents: item.subtotalCents,
    })),
    shippingAddress: {
      firstName: order.shippingAddress.firstName,
      lastName: order.shippingAddress.lastName,
      phone: order.shippingAddress.phone,
      addressLine1: order.shippingAddress.addressLine1,
      addressLine2: order.shippingAddress.addressLine2 ?? undefined,
      city: order.shippingAddress.city,
      province: order.shippingAddress.province,
      postalCode: order.shippingAddress.postalCode,
      country: order.shippingAddress.country,
    },
    deliveryMethod: {
      name: order.deliveryMethod.name,
      priceCents: order.deliveryMethod.priceCents,
      estimatedDays: order.deliveryMethod.estimatedDays ?? undefined,
    },
    subtotalCents: order.subtotalCents,
    shippingCostCents: order.shippingCostCents,
    discountCents: order.discountCents,
    totalCents: order.totalCents,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

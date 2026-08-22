import type { OrderStatus, PaymentStatus, PaymentMethod } from '../constants/order';

export interface PublicOrderItem {
  productId: string;
  nameSnapshot: string;
  imageSnapshot: string;
  selectedSize?: string;
  quantity: number;
  unitPriceCents: number;
  subtotalCents: number;
}

export interface PublicShippingAddress {
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface PublicDeliveryMethodSnapshot {
  name: string;
  priceCents: number;
  estimatedDays?: string;
}

export interface PublicOrder {
  id: string;
  orderNumber: string;
  items: PublicOrderItem[];
  shippingAddress: PublicShippingAddress;
  deliveryMethod: PublicDeliveryMethodSnapshot;
  subtotalCents: number;
  shippingCostCents: number;
  discountCents: number;
  totalCents: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

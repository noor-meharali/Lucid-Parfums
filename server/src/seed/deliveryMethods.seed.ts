import type { DeliveryMethodAttrs } from '../models/DeliveryMethod';

export const deliveryMethodSeeds: Partial<DeliveryMethodAttrs>[] = [
  {
    name: 'Standard Delivery',
    description: 'Delivered in a protective, unbranded box.',
    priceCents: 500,
    estimatedDays: '3–5 business days',
    isActive: true,
    sortOrder: 0,
  },
  {
    name: 'Express Delivery',
    description: 'Priority handling and faster transit.',
    priceCents: 1500,
    estimatedDays: '1–2 business days',
    isActive: true,
    sortOrder: 1,
  },
];

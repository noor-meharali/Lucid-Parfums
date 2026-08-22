import type { DeliveryMethodDocument } from '../models/DeliveryMethod';
import type { PublicDeliveryMethod } from '../types/deliveryMethod';

export function serializeDeliveryMethod(method: DeliveryMethodDocument): PublicDeliveryMethod {
  return {
    id: method._id.toString(),
    name: method.name,
    description: method.description ?? undefined,
    priceCents: method.priceCents,
    estimatedDays: method.estimatedDays ?? undefined,
  };
}

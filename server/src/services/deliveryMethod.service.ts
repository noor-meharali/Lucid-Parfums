import { DeliveryMethod, type DeliveryMethodDocument } from '../models/DeliveryMethod';
import { serializeDeliveryMethod } from '../utils/serializeDeliveryMethod';
import { ApiError } from '../utils/ApiError';
import type { PublicDeliveryMethod } from '../types/deliveryMethod';

export const deliveryMethodService = {
  async list(): Promise<PublicDeliveryMethod[]> {
    const methods = await DeliveryMethod.find({ isActive: true }).sort({ sortOrder: 1 });
    return methods.map(serializeDeliveryMethod);
  },

  /** Used by order creation — validated fresh, never trusted from the frontend beyond which id was chosen. */
  async getActiveById(id: string): Promise<DeliveryMethodDocument> {
    const method = await DeliveryMethod.findOne({ _id: id, isActive: true });
    if (!method) throw ApiError.badRequest('The selected delivery method is not available.');
    return method;
  },
};

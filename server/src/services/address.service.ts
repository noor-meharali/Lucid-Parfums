import { Address, type AddressDocument } from '../models/Address';
import { serializeAddress } from '../utils/serializeAddress';
import { ApiError } from '../utils/ApiError';
import type { PublicAddress } from '../types/address';
import type { AddressInput, UpdateAddressInput } from '../validators/address.validator';

/**
 * Looked up by `{_id, user}` together everywhere — never `{_id}`
 * alone — so an address id that belongs to a different customer
 * simply doesn't match anything, rather than needing a separate
 * ownership check after the fact.
 */
async function findOwned(userId: string, addressId: string): Promise<AddressDocument> {
  const address = await Address.findOne({ _id: addressId, user: userId });
  if (!address) throw ApiError.notFound('Address not found.');
  return address;
}

export const addressService = {
  async list(userId: string): Promise<PublicAddress[]> {
    const addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
    return addresses.map(serializeAddress);
  },

  async create(userId: string, input: AddressInput): Promise<PublicAddress> {
    if (input.isDefault) {
      await Address.updateMany({ user: userId }, { $set: { isDefault: false } });
    }

    const existingCount = await Address.countDocuments({ user: userId });
    const address = await Address.create({
      ...input,
      user: userId,
      // A customer's first address becomes their default automatically.
      isDefault: input.isDefault ?? existingCount === 0,
    });
    return serializeAddress(address);
  },

  async update(userId: string, addressId: string, input: UpdateAddressInput): Promise<PublicAddress> {
    const address = await findOwned(userId, addressId);

    if (input.isDefault) {
      await Address.updateMany({ user: userId, _id: { $ne: address._id } }, { $set: { isDefault: false } });
    }

    Object.assign(address, input);
    await address.save();
    return serializeAddress(address);
  },

  async remove(userId: string, addressId: string): Promise<void> {
    const address = await findOwned(userId, addressId);
    await address.deleteOne();
  },

  async setDefault(userId: string, addressId: string): Promise<PublicAddress> {
    const address = await findOwned(userId, addressId);
    await Address.updateMany({ user: userId, _id: { $ne: address._id } }, { $set: { isDefault: false } });
    address.isDefault = true;
    await address.save();
    return serializeAddress(address);
  },

  /** Used by order creation to fetch and validate a chosen shipping address in one place. */
  async getOwned(userId: string, addressId: string): Promise<AddressDocument> {
    return findOwned(userId, addressId);
  },
};

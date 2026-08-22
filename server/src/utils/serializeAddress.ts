import type { AddressDocument } from '../models/Address';
import type { PublicAddress } from '../types/address';

export function serializeAddress(address: AddressDocument): PublicAddress {
  return {
    id: address._id.toString(),
    firstName: address.firstName,
    lastName: address.lastName,
    phone: address.phone,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 ?? undefined,
    city: address.city,
    province: address.province,
    postalCode: address.postalCode,
    country: address.country,
    isDefault: address.isDefault,
    createdAt: address.createdAt.toISOString(),
    updatedAt: address.updatedAt.toISOString(),
  };
}

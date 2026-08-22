import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Radio } from '@/components/form/Radio';
import { Button } from '@/components/common/Button';
import { AddressForm } from '@/components/checkout/AddressForm';
import type { Address, AddressInput } from '@/types/address';

interface AddressSelectorProps {
  addresses: Address[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: (input: AddressInput) => Promise<void>;
}

export function AddressSelector({ addresses, selectedId, onSelect, onAddNew }: AddressSelectorProps) {
  const [isAdding, setIsAdding] = useState(addresses.length === 0);

  async function handleAddNew(input: AddressInput) {
    await onAddNew(input);
    setIsAdding(false);
  }

  return (
    <div className="flex flex-col gap-4">
      {addresses.length > 0 && !isAdding && (
        <div className="flex flex-col gap-3">
          {addresses.map((address) => (
            <label
              key={address.id}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-beige p-4 has-[:checked]:border-espresso"
            >
              <Radio name="address" checked={selectedId === address.id} onChange={() => onSelect(address.id)} label="" className="mt-0.5" />
              <div className="text-body-sm text-espresso">
                <p className="font-medium">
                  {address.firstName} {address.lastName}
                  {address.isDefault && <span className="ml-2 text-label uppercase text-taupe">Default</span>}
                </p>
                <p className="text-taupe">
                  {address.addressLine1}
                  {address.addressLine2 ? `, ${address.addressLine2}` : ''}, {address.city}, {address.province}{' '}
                  {address.postalCode}, {address.country}
                </p>
                <p className="text-taupe">{address.phone}</p>
              </div>
            </label>
          ))}
        </div>
      )}

      {isAdding ? (
        <div className="rounded-md border border-beige p-4">
          <AddressForm
            onSubmit={handleAddNew}
            onCancel={addresses.length > 0 ? () => setIsAdding(false) : undefined}
            submitLabel="Use This Address"
          />
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setIsAdding(true)} className="self-start">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add a new address
        </Button>
      )}
    </div>
  );
}

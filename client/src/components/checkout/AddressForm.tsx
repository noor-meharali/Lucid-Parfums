import { useState, type FormEvent } from 'react';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import type { AddressInput } from '@/types/address';

interface AddressFormProps {
  initialValues?: Partial<AddressInput>;
  onSubmit: (input: AddressInput) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

const EMPTY_ADDRESS: AddressInput = {
  firstName: '',
  lastName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postalCode: '',
  country: '',
};

/**
 * Shared by checkout (adding a shipping address inline) and the
 * account page's saved-address management — one form, one set of
 * validation rules, instead of two implementations that could drift.
 */
export function AddressForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save Address' }: AddressFormProps) {
  const [values, setValues] = useState<AddressInput>({ ...EMPTY_ADDRESS, ...initialValues });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof AddressInput>(key: K, value: AddressInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="First Name" required value={values.firstName} onChange={(e) => set('firstName', e.target.value)} />
        <Input label="Last Name" required value={values.lastName} onChange={(e) => set('lastName', e.target.value)} />
      </div>
      <Input label="Phone" type="tel" required value={values.phone} onChange={(e) => set('phone', e.target.value)} />
      <Input label="Address Line 1" required value={values.addressLine1} onChange={(e) => set('addressLine1', e.target.value)} />
      <Input
        label="Address Line 2"
        helperText="Optional"
        value={values.addressLine2}
        onChange={(e) => set('addressLine2', e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="City" required value={values.city} onChange={(e) => set('city', e.target.value)} />
        <Input label="Province / State" required value={values.province} onChange={(e) => set('province', e.target.value)} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Postal Code" required value={values.postalCode} onChange={(e) => set('postalCode', e.target.value)} />
        <Input label="Country" required value={values.country} onChange={(e) => set('country', e.target.value)} />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}

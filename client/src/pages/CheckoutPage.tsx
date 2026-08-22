import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { Spinner } from '@/components/common/Spinner';
import { AddressSelector } from '@/components/checkout/AddressSelector';
import { DeliveryMethodSelector } from '@/components/checkout/DeliveryMethodSelector';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { useCart } from '@/context/CartContext';
import { useAddresses } from '@/hooks/useAddresses';
import { useDeliveryMethods } from '@/hooks/useDeliveryMethods';
import { useToast } from '@/context/ToastContext';
import { addressService } from '@/services/addressService';
import { orderService } from '@/services/orderService';
import { ApiRequestError } from '@/api/client';
import { ROUTES, orderSuccessPath } from '@/constants/routes';
import type { PaymentMethod } from '@/types/order';
import type { AddressInput } from '@/types/address';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotalCents, isLoading: isCartLoading } = useCart();
  const { addresses, isLoading: isLoadingAddresses, refresh: refreshAddresses } = useAddresses();
  const { methods, isLoading: isLoadingMethods } = useDeliveryMethods();
  const { showToast } = useToast();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const isLoading = isCartLoading || isLoadingAddresses || isLoadingMethods;
  const defaultAddressId = addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null;
  const activeAddressId = selectedAddressId ?? defaultAddressId;
  const defaultMethodId = methods[0]?.id ?? null;
  const activeMethodId = selectedMethodId ?? defaultMethodId;
  const selectedMethod = methods.find((m) => m.id === activeMethodId) ?? null;

  async function handleAddNewAddress(input: AddressInput) {
    try {
      const response = await addressService.create(input);
      await refreshAddresses();
      setSelectedAddressId(response.data.id);
      showToast('success', 'Address saved.');
    } catch (error) {
      showToast('error', error instanceof ApiRequestError ? error.message : 'Could not save address.');
    }
  }

  async function handlePlaceOrder() {
    if (!activeAddressId || !activeMethodId) return;

    setOrderError(null);
    setIsPlacingOrder(true);
    try {
      const response = await orderService.create({
        addressId: activeAddressId,
        deliveryMethodId: activeMethodId,
        paymentMethod,
      });
      navigate(orderSuccessPath(response.data.orderNumber));
    } catch (error) {
      const message = error instanceof ApiRequestError ? error.message : 'Something went wrong placing your order.';
      setOrderError(message);
      showToast('error', message);
    } finally {
      setIsPlacingOrder(false);
    }
  }

  if (isLoading) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-16">
        <Spinner className="h-6 w-6" />
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Your bag is empty"
          description="Add something to your bag before checking out."
          action={{ label: 'Shop the Collection', onClick: () => navigate(ROUTES.SHOP) }}
        />
      </Container>
    );
  }

  const canPlaceOrder = Boolean(activeAddressId && activeMethodId) && !isPlacingOrder;

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="mb-8 font-serif text-display-md text-espresso">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 font-serif text-heading-sm text-espresso">Shipping Address</h2>
            <AddressSelector
              addresses={addresses}
              selectedId={activeAddressId}
              onSelect={setSelectedAddressId}
              onAddNew={handleAddNewAddress}
            />
          </section>

          <section>
            <h2 className="mb-4 font-serif text-heading-sm text-espresso">Delivery Method</h2>
            <DeliveryMethodSelector methods={methods} selectedId={activeMethodId} onSelect={setSelectedMethodId} />
          </section>

          <section>
            <h2 className="mb-4 font-serif text-heading-sm text-espresso">Payment Method</h2>
            <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <OrderSummary
            items={items}
            subtotalCents={subtotalCents}
            shippingCostCents={selectedMethod?.priceCents ?? null}
          />
          {orderError && (
            <p role="alert" className="text-body-sm text-destructive">
              {orderError}
            </p>
          )}
          <Button variant="primary" size="lg" disabled={!canPlaceOrder} isLoading={isPlacingOrder} onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </Container>
  );
}

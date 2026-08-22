import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { OrderStatusBadge, PaymentStatusBadge } from '@/components/order/OrderStatusBadge';
import { formatPrice } from '@/utils/formatPrice';
import type { Order } from '@/types/order';

interface OrderDetailCardProps {
  order: Order;
}

const PAYMENT_METHOD_LABEL: Record<Order['paymentMethod'], string> = {
  cod: 'Cash on Delivery',
  online: 'Online Payment',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-beige pb-6">
        <div>
          <p className="text-label uppercase tracking-[0.15em] text-taupe">Order</p>
          <p className="font-serif text-heading-md text-espresso">{order.orderNumber}</p>
          <p className="mt-1 text-body-sm text-taupe">Placed {formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <OrderStatusBadge status={order.orderStatus} />
          <PaymentStatusBadge status={order.paymentStatus} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <ResponsiveImage
              src={item.imageSnapshot}
              alt={item.nameSnapshot}
              aspectRatio="1/1"
              containerClassName="w-16 shrink-0 rounded-sm"
            />
            <div className="min-w-0 flex-1">
              <p className="text-body-sm font-medium text-espresso">{item.nameSnapshot}</p>
              {item.selectedSize && <p className="text-body-sm text-taupe">{item.selectedSize}</p>}
              <p className="text-body-sm text-taupe">Qty {item.quantity}</p>
            </div>
            <span className="shrink-0 text-body-sm text-espresso">{formatPrice(item.subtotalCents)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 border-t border-beige pt-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-label uppercase tracking-[0.15em] text-taupe">Shipping Address</p>
          <p className="text-body-sm text-espresso">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            <br />
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
            <br />
            {order.shippingAddress.country}
            <br />
            {order.shippingAddress.phone}
          </p>
        </div>
        <div>
          <p className="mb-2 text-label uppercase tracking-[0.15em] text-taupe">Delivery &amp; Payment</p>
          <p className="text-body-sm text-espresso">
            {order.deliveryMethod.name}
            {order.deliveryMethod.estimatedDays ? ` — ${order.deliveryMethod.estimatedDays}` : ''}
            <br />
            {PAYMENT_METHOD_LABEL[order.paymentMethod]}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-beige pt-6 text-body-sm">
        <div className="flex items-center justify-between text-taupe">
          <span>Subtotal</span>
          <span className="text-espresso">{formatPrice(order.subtotalCents)}</span>
        </div>
        <div className="flex items-center justify-between text-taupe">
          <span>Shipping</span>
          <span className="text-espresso">{formatPrice(order.shippingCostCents)}</span>
        </div>
        {order.discountCents > 0 && (
          <div className="flex items-center justify-between text-taupe">
            <span>Discount</span>
            <span className="text-espresso">−{formatPrice(order.discountCents)}</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-beige pt-3 text-body-md font-medium text-espresso">
          <span>Total</span>
          <span>{formatPrice(order.totalCents)}</span>
        </div>
      </div>
    </div>
  );
}

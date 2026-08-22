import { cn } from '@/utils/cn';
import type { OrderStatus, PaymentStatus } from '@/types/order';

const ORDER_STATUS_STYLE: Record<OrderStatus, string> = {
  pending: 'bg-warning-soft text-warning',
  confirmed: 'bg-champagne/40 text-espresso',
  processing: 'bg-champagne/40 text-espresso',
  shipped: 'bg-gold/15 text-bronze',
  delivered: 'bg-success-soft text-success',
  cancelled: 'bg-destructive-soft text-destructive',
};

const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const PAYMENT_STATUS_STYLE: Record<PaymentStatus, string> = {
  pending: 'bg-warning-soft text-warning',
  paid: 'bg-success-soft text-success',
  failed: 'bg-destructive-soft text-destructive',
  refunded: 'bg-offwhite text-taupe',
};

const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending: 'Payment Pending',
  paid: 'Paid',
  failed: 'Payment Failed',
  refunded: 'Refunded',
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={cn('inline-flex items-center rounded-sm px-2 py-1 text-label font-medium uppercase tracking-[0.08em]', ORDER_STATUS_STYLE[status])}>
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={cn('inline-flex items-center rounded-sm px-2 py-1 text-label font-medium uppercase tracking-[0.08em]', PAYMENT_STATUS_STYLE[status])}>
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

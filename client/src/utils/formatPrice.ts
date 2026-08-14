/**
 * Formats a number of cents as a localized currency string.
 * Centralized so price formatting is consistent everywhere,
 * regardless of which part of the app renders it.
 */
export function formatPrice(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

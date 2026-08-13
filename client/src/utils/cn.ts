export type ClassValue = string | number | null | boolean | undefined;

/**
 * Joins conditional class names together, filtering out falsy values.
 * Keeps components free of inline ternaries for className strings.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

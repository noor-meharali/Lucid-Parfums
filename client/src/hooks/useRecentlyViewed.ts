import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lucid-parfums:recently-viewed';
const MAX_ITEMS = 8;

export interface RecentlyViewedItem {
  slug: string;
  name: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  priceCents: number;
  salePriceCents?: number;
}

function readStored(): RecentlyViewedItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as RecentlyViewedItem[]) : [];
  } catch {
    return [];
  }
}

function writeStored(items: RecentlyViewedItem[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable (private browsing, quota exceeded).
    // Recently-viewed is a nice-to-have — never worth breaking the page for.
  }
}

/**
 * Records `current` as viewed (client-side only — nothing is sent to
 * the backend) and returns the rest of the recently-viewed list,
 * excluding the product currently on screen. A lightweight snapshot
 * is stored per item rather than just an id, so displaying the list
 * never needs an extra API round trip.
 */
export function useRecentlyViewed(current?: RecentlyViewedItem): RecentlyViewedItem[] {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    const stored = readStored();
    setItems(stored.filter((item) => item.slug !== current?.slug));

    if (current) {
      const next = [current, ...stored.filter((item) => item.slug !== current.slug)].slice(0, MAX_ITEMS);
      writeStored(next);
    }
    // Re-run only when the viewed product changes, not on every
    // render (the snapshot object's identity is otherwise unstable).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.slug]);

  return items;
}

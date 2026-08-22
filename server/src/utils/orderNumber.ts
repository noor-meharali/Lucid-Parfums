import { Counter } from '../models/Counter';
import type { ClientSession } from 'mongoose';

/**
 * Generates order numbers like LP-2026-000001. Uses an atomic $inc
 * on a dedicated counter document rather than counting existing
 * orders, so concurrent checkouts can never be assigned the same
 * number.
 */
export async function nextOrderNumber(session?: ClientSession): Promise<string> {
  const year = new Date().getFullYear();
  const key = `order-${year}`;

  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { upsert: true, new: true, session },
  );

  return `LP-${year}-${String(counter.seq).padStart(6, '0')}`;
}

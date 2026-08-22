import { Schema, model } from 'mongoose';

/**
 * Backs sequential, human-friendly IDs (order numbers) with an
 * atomic $inc rather than counting existing documents — counting is
 * subject to a race condition under concurrent orders and can
 * produce duplicates; an atomic increment on a dedicated counter
 * document cannot.
 */
const counterSchema = new Schema({
  key: { type: String, required: true, unique: true },
  seq: { type: Number, required: true, default: 0 },
});

export const Counter = model('Counter', counterSchema);

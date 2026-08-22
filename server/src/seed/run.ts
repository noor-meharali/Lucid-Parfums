import { connectDatabase, disconnectDatabase } from '../config/db';
import { Product } from '../models/Product';
import { Review } from '../models/Review';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { productSeeds } from './products.seed';
import { reviewSeedsBySlug } from './reviews.seed';
import { deliveryMethodSeeds } from './deliveryMethods.seed';
import { logger } from '../utils/logger';

/**
 * Seeds the demo catalog into whatever database DATABASE_URL points
 * at. Upserts products by slug, so it's safe to run repeatedly —
 * existing products are updated in place rather than duplicated.
 * Reviews are only inserted for a product the first time it has none,
 * so re-running never piles up duplicate reviews either.
 *
 * Usage: npm run seed   (from server/, with a real .env in place)
 */
async function run(): Promise<void> {
  await connectDatabase();

  let created = 0;
  let updated = 0;

  for (const seed of productSeeds) {
    const result = await Product.findOneAndUpdate(
      { slug: seed.slug },
      { $set: seed },
      { upsert: true, new: true, includeResultMetadata: true },
    );
    if (result.lastErrorObject?.upserted) created += 1;
    else updated += 1;
  }

  let reviewsInserted = 0;
  for (const [slug, reviews] of Object.entries(reviewSeedsBySlug)) {
    const product = await Product.findOne({ slug });
    if (!product) continue;

    const existingCount = await Review.countDocuments({ product: product._id });
    if (existingCount > 0) continue;

    await Review.insertMany(reviews.map((review) => ({ ...review, product: product._id })));
    reviewsInserted += reviews.length;
  }

  let deliveryMethodsUpserted = 0;
  for (const method of deliveryMethodSeeds) {
    await DeliveryMethod.findOneAndUpdate({ name: method.name }, { $set: method }, { upsert: true });
    deliveryMethodsUpserted += 1;
  }

  logger.info(
    `Seed complete: ${created} product(s) created, ${updated} updated, ${reviewsInserted} review(s) inserted, ${deliveryMethodsUpserted} delivery method(s) upserted.`,
  );
  await disconnectDatabase();
  process.exit(0);
}

run().catch((error: unknown) => {
  logger.error(`Seed failed: ${(error as Error).message}`);
  process.exit(1);
});

/**
 * Demo reviews for a handful of seed products — real database rows,
 * not frontend-hardcoded fake reviews. Seeded via `npm run seed`
 * (see run.ts), keyed by product slug so they attach to whatever
 * `_id` that product actually has in your database.
 */
export const reviewSeedsBySlug: Record<
  string,
  { authorName: string; rating: number; comment: string; verifiedPurchase: boolean }[]
> = {
  'ambre-noir': [
    {
      authorName: 'Priya S.',
      rating: 5,
      comment:
        'Warm without being heavy — I get compliments every time I wear this. Lasts well into the evening from a morning application.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Daniel K.',
      rating: 5,
      comment: 'My go-to for fall and winter. The smoke note is subtle, not overpowering.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Maya R.',
      rating: 4,
      comment: 'Beautiful amber base. Wish the bottle was slightly bigger for the price.',
      verifiedPurchase: false,
    },
  ],
  'rose-cendree': [
    {
      authorName: 'Elena V.',
      rating: 5,
      comment: 'Not your typical sweet rose — this one has real depth. Smoky and sophisticated.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Sophie T.',
      rating: 5,
      comment: 'Ordered a second bottle within a month. Genuinely my favorite in the collection.',
      verifiedPurchase: true,
    },
  ],
  'santal-brume': [
    {
      authorName: 'James O.',
      rating: 5,
      comment: 'Creamy sandalwood done right. Longevity is excellent, easily 8+ hours on me.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Ahmed F.',
      rating: 4,
      comment: 'Lovely and warm. Projects a bit close to the skin after the first hour, which I actually prefer.',
      verifiedPurchase: true,
    },
  ],
  'fleur-de-nuit': [
    {
      authorName: 'Clara B.',
      rating: 5,
      comment: 'Perfect evening scent. The jasmine is rich without tipping into cloying.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Nadia H.',
      rating: 4,
      comment: 'Gorgeous, though I find it a touch strong in enclosed spaces — a little goes a long way.',
      verifiedPurchase: false,
    },
  ],
  'musc-blanc': [
    {
      authorName: 'Olivia P.',
      rating: 5,
      comment: 'Exactly the "clean skin" scent I was looking for. Doesn\u2019t smell like anything artificial.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Grace L.',
      rating: 4,
      comment: 'Very close to the skin, which I like, though it means it doesn\u2019t last all day for me.',
      verifiedPurchase: true,
    },
  ],
  'oud-celeste': [
    {
      authorName: 'Karim M.',
      rating: 5,
      comment: 'The most balanced oud I\u2019ve tried — rich but never harsh. Worth the investment.',
      verifiedPurchase: true,
    },
    {
      authorName: 'Yusuf A.',
      rating: 4,
      comment: 'Excellent quality. Sale price made it an easy decision.',
      verifiedPurchase: true,
    },
  ],
};

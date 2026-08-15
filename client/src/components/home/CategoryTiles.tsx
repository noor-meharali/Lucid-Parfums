import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { ROUTES } from '@/constants/routes';

const CATEGORIES = [
  { label: 'Men', to: ROUTES.MEN, fill: '#211d1a', bg: '#e8dfd0' },
  { label: 'Women', to: ROUTES.WOMEN, fill: '#8c6d4f', bg: '#f4f1ec' },
  { label: 'Unisex', to: ROUTES.UNISEX, fill: '#4a3728', bg: '#e3c9a1' },
  { label: 'Fragrance', to: ROUTES.FRAGRANCE, fill: '#b08d57', bg: '#f7f2ea' },
];

function TileGlyph({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-14 w-14" aria-hidden="true">
      <rect x="38" y="14" width="24" height="14" rx="3" fill={fill} opacity="0.85" />
      <path
        d="M32 30 h36 a6 6 0 0 1 6 6 v46 a10 10 0 0 1 -10 10 h-28 a10 10 0 0 1 -10 -10 v-46 a6 6 0 0 1 6 -6 z"
        fill="none"
        stroke={fill}
        strokeWidth="2.5"
      />
      <line x1="32" y1="58" x2="68" y2="58" stroke={fill} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function CategoryTiles() {
  return (
    <section className="bg-cream py-20">
      <Container>
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <span className="text-label uppercase tracking-[0.2em] text-taupe">Shop by Category</span>
          <h2 className="font-serif text-heading-lg text-espresso">Find Your Fragrance</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CATEGORIES.map(({ label, to, fill, bg }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col items-center gap-4 rounded-md border border-beige px-6 py-10 transition-colors duration-200 hover:border-gold"
              style={{ backgroundColor: bg }}
            >
              <span className="transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-110">
                <TileGlyph fill={fill} />
              </span>
              <span className="font-serif text-heading-sm text-espresso">{label}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { Container } from '@/components/common/Container';
import { Logo } from '@/components/common/Logo';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/constants/routes';
import { FOOTER_SHOP_LINKS } from '@/constants/nav';

const CUSTOMER_CARE_LINKS = [
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Shipping', to: '/shipping' },
  { label: 'Returns', to: '/returns' },
  { label: 'Track Order', to: ROUTES.ORDERS },
];

const COMPANY_LINKS = [
  { label: 'About', to: ROUTES.ABOUT },
  { label: 'Our Story', to: ROUTES.ABOUT },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

/**
 * Minimal, generic glyphs — lucide-react ships no brand marks, and no
 * real social account exists yet to link to, so these render as inert
 * placeholders rather than pointing at invented URLs.
 */
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M14 8.5h-1.5A2 2 0 0 0 10.5 10.5V12H9v2h1.5v5H13v-5h1.8l.3-2H13v-1.2c0-.4.3-.8.8-.8H14z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'Instagram', Glyph: InstagramGlyph },
  { label: 'Facebook', Glyph: FacebookGlyph },
  { label: 'X', Glyph: XGlyph },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-label uppercase tracking-[0.08em] text-taupe">{title}</span>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-body-sm text-espresso/80 transition-colors hover:text-espresso">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-beige bg-cream">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col items-start gap-4 sm:col-span-2 lg:col-span-2">
            <Logo className="items-start" />
            <p className="max-w-xs text-body-sm text-taupe">
              Fine fragrance, composed with restraint. Crafted for those who prefer to be discovered slowly.
            </p>
            <div className="flex items-center gap-1">
              {SOCIAL_LINKS.map(({ label, Glyph }) => (
                <button
                  key={label}
                  type="button"
                  disabled
                  title={`${label} — coming soon`}
                  aria-label={`${label} (coming soon)`}
                  className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full text-espresso/50"
                >
                  <Glyph />
                </button>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={FOOTER_SHOP_LINKS} />
          <FooterColumn title="Customer Care" links={CUSTOMER_CARE_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-beige pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-heading-sm text-espresso">Join the list</p>
            <p className="mt-1 text-body-sm text-taupe">New releases and early access. No noise.</p>
          </div>
          <form
            className="flex w-full max-w-sm items-start gap-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex-1">
              <Input type="email" aria-label="Email address" placeholder="Your email" />
            </div>
            <Button type="submit" variant="dark" size="md">
              Subscribe
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-3 border-t border-beige pt-6 text-body-sm text-taupe sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Lucid Parfums. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

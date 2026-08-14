import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

interface LogoProps {
  className?: string;
  tone?: 'default' | 'inverted';
}

/**
 * The Lucid Parfums wordmark: the maison name set wide in serif,
 * with its designation tracked out in small caps beneath — the
 * layout convention perfume labels have used for a century.
 */
export function Logo({ className, tone = 'default' }: LogoProps) {
  const primary = tone === 'inverted' ? 'text-ivory' : 'text-espresso';
  const secondary = tone === 'inverted' ? 'text-champagne/80' : 'text-taupe';

  return (
    <Link
      to={ROUTES.HOME}
      className={cn('inline-flex flex-col items-center leading-none', className)}
      aria-label="Lucid Parfums — home"
    >
      <span className={cn('font-serif text-2xl tracking-[0.14em]', primary)}>LUCID</span>
      <span className={cn('mt-1 text-[0.6rem] tracking-[0.42em]', secondary)}>PARFUMS</span>
    </Link>
  );
}

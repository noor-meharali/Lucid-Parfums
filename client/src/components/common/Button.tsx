import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'dark'
  | 'accent'
  | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-espresso text-ivory hover:bg-charcoal active:bg-charcoal',
  secondary: 'bg-cream text-espresso border border-beige hover:bg-champagne/40 active:bg-champagne/60',
  outline: 'bg-transparent text-espresso border border-espresso hover:bg-espresso hover:text-ivory',
  ghost: 'bg-transparent text-espresso hover:bg-cream active:bg-champagne/40',
  dark: 'bg-charcoal text-ivory hover:bg-espresso active:bg-espresso',
  accent: 'bg-gold text-ivory hover:bg-bronze active:bg-bronze',
  destructive: 'bg-destructive text-ivory hover:brightness-90 active:brightness-95',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-body-sm gap-1.5',
  md: 'h-11 px-6 text-body-sm gap-2',
  lg: 'h-14 px-8 text-body-md gap-2',
};

/**
 * Shared class builder so non-button elements that need to look like
 * a Button (e.g. a react-router `Link` styled as a CTA) can reuse the
 * exact same styles instead of nesting an anchor inside a button.
 */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(
    'inline-flex items-center justify-center rounded-pill font-medium tracking-wide',
    'transition-colors duration-200 ease-[var(--ease-premium)]',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
});

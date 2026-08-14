import { AlertTriangle, WifiOff, SearchX, Lock, ShieldOff, ServerCrash } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/common/Button';

export type ErrorVariant = 'generic' | 'network' | 'notFound' | 'unauthorized' | 'forbidden' | 'server';

interface ErrorStateProps {
  variant?: ErrorVariant;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

const VARIANT_CONTENT: Record<ErrorVariant, { icon: typeof AlertTriangle; title: string; description: string }> = {
  generic: {
    icon: AlertTriangle,
    title: 'Something went wrong',
    description: 'That action didn\u2019t go through. Try again in a moment.',
  },
  network: {
    icon: WifiOff,
    title: 'Connection lost',
    description: 'Check your internet connection and try again.',
  },
  notFound: {
    icon: SearchX,
    title: 'We couldn\u2019t find that',
    description: 'The page or item you\u2019re looking for isn\u2019t here.',
  },
  unauthorized: {
    icon: Lock,
    title: 'Sign in required',
    description: 'You need to be signed in to view this.',
  },
  forbidden: {
    icon: ShieldOff,
    title: 'Access restricted',
    description: 'You don\u2019t have permission to view this page.',
  },
  server: {
    icon: ServerCrash,
    title: 'Our server hit a snag',
    description: 'This is on us — please try again shortly.',
  },
};

/**
 * A user-facing error surface. Never renders raw error messages or
 * stack traces — only the plain-language copy defined per variant.
 */
export function ErrorState({ variant = 'generic', title, description, onRetry, className }: ErrorStateProps) {
  const content = VARIANT_CONTENT[variant];
  const Icon = content.icon;

  return (
    <div className={cn('flex flex-col items-center gap-3 px-6 py-16 text-center', className)}>
      <Icon className="h-8 w-8 text-taupe" aria-hidden="true" />
      <p className="font-serif text-heading-sm text-espresso">{title ?? content.title}</p>
      <p className="max-w-sm text-body-sm text-taupe">{description ?? content.description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  );
}

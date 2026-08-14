import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/common/Button';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

/**
 * An empty screen is an invitation to act — every empty state pairs
 * a plain-language explanation with a clear next step where one exists.
 */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3 px-6 py-16 text-center', className)}>
      <span className="text-taupe" aria-hidden="true">
        {icon}
      </span>
      <p className="font-serif text-heading-sm text-espresso">{title}</p>
      {description && <p className="max-w-sm text-body-sm text-taupe">{description}</p>}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}

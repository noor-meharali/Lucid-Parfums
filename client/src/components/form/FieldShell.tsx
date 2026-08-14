import type { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface FieldShellProps {
  label?: string;
  htmlFor: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

/**
 * Shared label / helper-text / error-text scaffold used by every form
 * control (Input, Textarea, Select) so spacing and error styling stay
 * identical across the whole form system.
 */
export function FieldShell({
  label,
  htmlFor,
  error,
  helperText,
  required,
  className,
  children,
}: PropsWithChildren<FieldShellProps>) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-body-sm font-medium text-espresso">
          {label}
          {required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p id={`${htmlFor}-message`} role="alert" className="text-body-sm text-destructive">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={`${htmlFor}-message`} className="text-body-sm text-taupe">
            {helperText}
          </p>
        )
      )}
    </div>
  );
}

/** id to put in aria-describedby on the control, when there's a message to announce. */
export function fieldMessageId(htmlFor: string, hasMessage: boolean): string | undefined {
  return hasMessage ? `${htmlFor}-message` : undefined;
}

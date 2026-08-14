import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id?: string;
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, error, className, disabled, ...props },
  ref,
) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={checkboxId}
        className={cn('flex items-center gap-2.5 text-body-sm text-espresso', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
      >
        <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className="peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-xs border border-beige bg-ivory transition-colors checked:border-espresso checked:bg-espresso focus-visible:outline-2 focus-visible:outline-gold disabled:cursor-not-allowed"
            {...props}
          />
          <Check
            className="pointer-events-none absolute h-3.5 w-3.5 text-ivory opacity-0 peer-checked:opacity-100"
            aria-hidden="true"
          />
        </span>
        {label}
      </label>
      {error && (
        <p role="alert" className="text-body-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
});

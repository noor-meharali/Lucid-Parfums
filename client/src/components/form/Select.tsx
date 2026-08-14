import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { FieldShell, fieldMessageId } from '@/components/form/FieldShell';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id?: string;
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, label, error, helperText, required, className, options, placeholder, defaultValue, ...props },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <FieldShell label={label} htmlFor={selectId} error={error} helperText={helperText} required={required}>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          required={required}
          defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={fieldMessageId(selectId, Boolean(error || helperText))}
          className={cn(
            'h-11 w-full appearance-none rounded-md border bg-ivory px-3.5 pr-10 text-body-md text-espresso transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:cursor-not-allowed disabled:bg-cream disabled:text-taupe',
            error ? 'border-destructive focus:ring-destructive/40' : 'border-beige focus:border-gold',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
          aria-hidden="true"
        />
      </div>
    </FieldShell>
  );
});

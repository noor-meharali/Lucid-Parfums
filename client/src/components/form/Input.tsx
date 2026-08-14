import { forwardRef, useId, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { FieldShell, fieldMessageId } from '@/components/form/FieldShell';
import { IconButton } from '@/components/common/IconButton';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id?: string;
  label?: string;
  error?: string;
  helperText?: string;
  onClear?: () => void;
}

const BASE_INPUT_CLASSES =
  'h-11 w-full rounded-md border bg-ivory px-3.5 text-body-md text-espresso placeholder:text-taupe/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:cursor-not-allowed disabled:bg-cream disabled:text-taupe';

/**
 * Covers text, email, password, number, and search inputs via the
 * standard `type` prop — password gets a visibility toggle, search
 * gets a leading icon and clear button, automatically.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, error, helperText, required, className, type = 'text', onClear, value, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isSearch = type === 'search';
  const resolvedType = isPassword && showPassword ? 'text' : type;

  return (
    <FieldShell label={label} htmlFor={inputId} error={error} helperText={helperText} required={required}>
      <div className="relative">
        {isSearch && (
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" aria-hidden="true" />
        )}
        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          required={required}
          value={value}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={fieldMessageId(inputId, Boolean(error || helperText))}
          className={cn(
            BASE_INPUT_CLASSES,
            error ? 'border-destructive focus:ring-destructive/40' : 'border-beige focus:border-gold',
            isSearch && 'pl-10',
            (isPassword || (isSearch && onClear && value)) && 'pr-11',
            className,
          )}
          {...props}
        />
        {isPassword && (
          <IconButton
            type="button"
            label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          </IconButton>
        )}
        {isSearch && onClear && value ? (
          <IconButton
            type="button"
            label="Clear search"
            onClick={onClear}
            className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        ) : null}
      </div>
    </FieldShell>
  );
});

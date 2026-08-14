import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { FieldShell, fieldMessageId } from '@/components/form/FieldShell';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id?: string;
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { id, label, error, helperText, required, className, rows = 4, ...props },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <FieldShell label={label} htmlFor={textareaId} error={error} helperText={helperText} required={required}>
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={fieldMessageId(textareaId, Boolean(error || helperText))}
        className={cn(
          'w-full resize-y rounded-md border bg-ivory px-3.5 py-2.5 text-body-md text-espresso placeholder:text-taupe/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:cursor-not-allowed disabled:bg-cream disabled:text-taupe',
          error ? 'border-destructive focus:ring-destructive/40' : 'border-beige focus:border-gold',
          className,
        )}
        {...props}
      />
    </FieldShell>
  );
});

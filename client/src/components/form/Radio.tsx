import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  id?: string;
  label: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, label, className, disabled, ...props },
  ref,
) {
  const generatedId = useId();
  const radioId = id ?? generatedId;

  return (
    <label
      htmlFor={radioId}
      className={cn('flex items-center gap-2.5 text-body-sm text-espresso', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
    >
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={radioId}
          type="radio"
          disabled={disabled}
          className={cn(
            'peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-beige bg-ivory transition-colors checked:border-[5px] checked:border-espresso focus-visible:outline-2 focus-visible:outline-gold disabled:cursor-not-allowed',
            className,
          )}
          {...props}
        />
      </span>
      {label}
    </label>
  );
});

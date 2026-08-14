import { ShoppingBag } from 'lucide-react';
import { IconButton } from '@/components/common/IconButton';
import { cn } from '@/utils/cn';

interface CartIconProps {
  count: number;
  onClick: () => void;
  tone?: 'default' | 'inverted';
}

export function CartIcon({ count, onClick, tone = 'default' }: CartIconProps) {
  return (
    <div className="relative">
      <IconButton label={`Cart, ${count} item${count === 1 ? '' : 's'}`} onClick={onClick} tone={tone}>
        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      </IconButton>
      {count > 0 && (
        <span
          className={cn(
            'pointer-events-none absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-medium leading-none',
            tone === 'inverted' ? 'bg-ivory text-charcoal' : 'bg-gold text-ivory',
          )}
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
}

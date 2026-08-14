import { useState, type ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'loading'> {
  alt: string;
  aspectRatio?: '1/1' | '3/4' | '4/3' | '16/9';
  containerClassName?: string;
}

const ASPECT_CLASS: Record<NonNullable<ResponsiveImageProps['aspectRatio']>, string> = {
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
};

/**
 * The single image component the storefront should use for product
 * and editorial photography. Handles a shimmering loading state and
 * a graceful fallback if the image fails, so product grids never show
 * broken-image icons.
 */
export function ResponsiveImage({
  alt,
  aspectRatio = '3/4',
  containerClassName,
  className,
  onLoad,
  onError,
  ...props
}: ResponsiveImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={cn('relative overflow-hidden bg-cream', ASPECT_CLASS[aspectRatio], containerClassName)}>
      {status !== 'error' && (
        <img
          {...props}
          alt={alt}
          loading="lazy"
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
          )}
          onLoad={(event) => {
            setStatus('loaded');
            onLoad?.(event);
          }}
          onError={(event) => {
            setStatus('error');
            onError?.(event);
          }}
        />
      )}
      {status === 'loading' && <div className="absolute inset-0 animate-pulse bg-beige/60" aria-hidden="true" />}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-taupe">
          <ImageOff className="h-6 w-6" aria-hidden="true" />
          <span className="text-label uppercase tracking-[0.08em]">Image unavailable</span>
        </div>
      )}
    </div>
  );
}

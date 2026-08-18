import { useRef, useState, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { Modal } from '@/components/common/Modal';
import { IconButton } from '@/components/common/IconButton';
import { cn } from '@/utils/cn';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const SWIPE_THRESHOLD_PX = 50;

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : [''];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const hasMultiple = gallery.length > 1;

  function goTo(index: number) {
    setActiveIndex((index + gallery.length) % gallery.length);
  }

  function handleTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent) {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;

    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) {
      goTo(activeIndex + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="group relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="block w-full cursor-zoom-in"
          aria-label="Open full-size image"
        >
          <ResponsiveImage
            src={gallery[activeIndex]}
            alt={`${alt} — image ${activeIndex + 1} of ${gallery.length}`}
            aspectRatio="1/1"
            containerClassName="rounded-lg"
          />
        </button>

        <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-espresso opacity-0 shadow-soft transition-opacity duration-200 group-hover:opacity-100">
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </span>

        {hasMultiple && (
          <>
            <IconButton
              label="Previous image"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-ivory/90 shadow-soft hover:bg-ivory"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </IconButton>
            <IconButton
              label="Next image"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-ivory/90 shadow-soft hover:bg-ivory"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </IconButton>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {gallery.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              className={cn(
                'h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                index === activeIndex ? 'border-gold' : 'border-transparent',
              )}
            >
              <ResponsiveImage src={image} alt="" aspectRatio="1/1" />
            </button>
          ))}
        </div>
      )}

      <Modal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={alt}
        className="max-w-3xl"
      >
        <ResponsiveImage
          src={gallery[activeIndex]}
          alt={`${alt} — image ${activeIndex + 1} of ${gallery.length}`}
          aspectRatio="1/1"
          containerClassName="rounded-md"
        />
      </Modal>
    </div>
  );
}

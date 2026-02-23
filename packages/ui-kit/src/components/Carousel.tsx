import type { ComponentProps, KeyboardEvent } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { Left, Right } from '@ergo-raffle/icons';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';

import { cn } from '@/lib/utils';

import { Button, type ButtonProps } from './Button';

type CarouselApi = UseEmblaCarouselType[1];

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
};

export type CarouselProps = ComponentProps<'div'>;

export const Carousel = ({ className, children, ...props }: CarouselProps) => {
  const [carouselRef, api] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

export const CarouselContent = ({ className, ...props }: ComponentProps<'div'>) => {
  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div className={cn('flex -ml-4', className)} {...props} />
    </div>
  );
};

export type CarouselItemProps = ComponentProps<'div'>;

export const CarouselItem = ({ className, ...props }: CarouselItemProps) => (
  <div
    data-slot="carousel-item"
    className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)}
    {...props}
  />
);

export type CarouselNavButtonProps = ButtonProps;

export const CarouselPrevious = ({ className, ...props }: CarouselNavButtonProps) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  if (!canScrollPrev) return null;
  return (
    <Button
      data-slot="carousel-previous"
      variant="ghost"
      size="icon-xs"
      className={cn(
        'rounded-full absolute touch-manipulation top-1/2 left-3.5 -translate-y-1/2',
        className
      )}
      onClick={scrollPrev}
      {...props}
    >
      <Left className="cn-rtl-flip" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
};

export const CarouselNext = ({ className, ...props }: CarouselNavButtonProps) => {
  const { scrollNext, canScrollNext } = useCarousel();
  if (!canScrollNext) return null;
  return (
    <Button
      data-slot="carousel-next"
      variant="ghost"
      size="icon-xs"
      className={cn(
        'rounded-full absolute touch-manipulation top-1/2 right-3.5 -translate-y-1/2',
        className
      )}
      onClick={scrollNext}
      {...props}
    >
      <Right className="cn-rtl-flip" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};

export type CarouselDotsProps = ComponentProps<'div'>;

export const CarouselDots = ({ className, ...props }: CarouselDotsProps) => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;

    setSnapPoints(api.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    onSelect();

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  if (!snapPoints.length) return null;

  return (
    <div
      {...props}
      className={cn('flex justify-center absolute left-0 right-0 bottom-3.25 space-x-2', className)}
    >
      {snapPoints.map((_, index) => (
        <Button
          key={crypto.randomUUID()}
          onClick={() => api?.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          variant="plain"
          className={cn(
            `flex size-4.5 sm:size-4.5 p-0 sm:p-0 rounded-full transition-all hover:bg-black-1 ${index === selectedIndex ? 'bg-black-1/75' : 'bg-black-1/35'}`
          )}
        />
      ))}
    </div>
  );
};

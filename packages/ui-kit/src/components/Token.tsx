import { type ComponentProps, useEffect, useRef, useState } from 'react';

import { TOKENS } from '@ergo-raffle/icons';

import { Skeleton } from './Skeleton';

export type TokenProps = ComponentProps<'span'> & {
  loading?: boolean;
  name?: string;
  tokenId?: string;
};

export const Token = ({ loading, name = 'Unsupported token', tokenId }: TokenProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef<HTMLSpanElement | null>(null);

  const url = TOKENS[tokenId as keyof typeof TOKENS];

  const isLoading = loading || (!!url && !isLoaded);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);

        observer.disconnect();
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className="flex items-center">
      {!!url && isVisible && (
        // biome-ignore lint/performance/noImgElement: <explanation>
        <img
          alt={`Token ${name}`}
          src={url}
          loading="lazy"
          className="mr-1 size-5"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      )}

      {!isLoading && !url && (
        <span className="uppercase bg-black-4 text-black-4-foreground rounded-full typo-subtitle-sm flex items-center justify-center size-5 mr-1">
          {name.slice(0, 1)}
        </span>
      )}

      {isLoading ? (
        <>
          <Skeleton className="size-5 rounded-full mr-1" />
          <Skeleton className="h-3 w-14 rounded-full" />
        </>
      ) : (
        <span className="truncate">{name}</span>
      )}
    </span>
  );
};

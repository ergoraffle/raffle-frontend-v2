import { type ComponentProps, useEffect, useRef, useState } from 'react';

import { TOKENS } from '@ergo-raffle/icons';

import { useFramework } from '../providers';
import { Skeleton } from './Skeleton';
import { Typography } from './Typography';

export type TokenProps = ComponentProps<'span'> & {
  loading?: boolean;
  name?: string;
  tokenId?: string;
  size?: 'default' | 'lg';
};

export const Token = ({
  loading,
  name = 'Unsupported token',
  size = 'default',
  tokenId
}: TokenProps) => {
  const Image = useFramework().components.Image;
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
    <span ref={ref} className={`flex items-center ${size === 'lg' ? 'space-x-1.5' : 'space-x-1'}`}>
      {!!url && isVisible && (
        <Image
          alt={`Token ${name}`}
          src={url}
          loading="lazy"
          width={size === 'lg' ? 24 : 20}
          height={size === 'lg' ? 24 : 20}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      )}

      {!isLoading && !url && (
        <span
          className={`uppercase bg-black-4 text-black-4-foreground rounded-full typo-subtitle-sm flex items-center justify-center ${size === 'lg' ? 'size-6' : 'size-5'}`}
        >
          {name.slice(0, 1)}
        </span>
      )}

      {isLoading ? (
        <>
          <Skeleton className="size-5 rounded-full mr-1" />
          <Skeleton className="h-3 w-14 rounded-md" />
        </>
      ) : (
        <Typography asChild variant={size === 'lg' ? 'body-lg' : 'subtitle-md'}>
          <span className="truncate">{name}</span>
        </Typography>
      )}
    </span>
  );
};

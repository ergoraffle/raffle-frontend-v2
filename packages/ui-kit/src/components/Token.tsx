import { type ComponentProps, useEffect, useRef, useState } from 'react';

import { TOKENS } from '@ergo-raffle/icons';
import { cva, type VariantProps } from 'class-variance-authority';

export const tokenVariants = cva();

export type TokenProps = ComponentProps<'span'> &
  VariantProps<typeof tokenVariants> & {
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
    <span ref={ref}>
      {!!url && isVisible && (
        // biome-ignore lint/performance/noImgElement: <explanation>
        <img
          alt={`Token ${name}`}
          src={url}
          loading="lazy"
          style={{
            width: '1em',
            height: '1em',
            borderRadius: '50%',
            objectFit: 'cover',
            opacity: isLoading ? '0' : '1',
            position: isLoading ? 'absolute' : 'static',
            pointerEvents: isLoading ? 'none' : 'auto',
            background: 'rgb(245, 245, 245)',
            padding: '2px'
          }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
      )}

      {!!isLoading && <span>Show Skeleton</span>}

      {/* show only the first character in uppercase */}
      {!isLoading && !url && <span>{name}</span>}

      {/* the name should be truncated */}
      <span>{name}</span>
    </span>
  );
};

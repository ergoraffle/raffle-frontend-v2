'use client';

import { useEffect, useRef, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
  StyledTextPreview,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import { markdownToHtml } from '@/lib';

import type { RaffleDetailView } from './raffleToViewModel';

export type RaffleDetailsDescriptionProps = { raffle?: RaffleDetailView; loading?: boolean };

export const RaffleDetailsDescription = ({ raffle, loading }: RaffleDetailsDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      !isOverflowing && setIsOverflowing(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);

    return () => observer.disconnect();
  }, [isOverflowing]);

  return loading ? (
    <Card shadow>
      <CardHeader>
        <CardTitle>Description:</CardTitle>
        <CardDescription>A very short Description.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2 mb-6" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </CardContent>
    </Card>
  ) : raffle?.description ? (
    <Card shadow>
      <CardHeader>
        <CardTitle>Description:</CardTitle>
        <CardDescription>A very short Description.</CardDescription>
      </CardHeader>
      <CardContent>
        <StyledTextPreview
          className={isMobile && !expanded ? 'line-clamp-3' : ''}
          ref={ref}
          text={markdownToHtml(raffle.description)}
        />
        {isMobile && isOverflowing ? (
          <Button
            variant="plain"
            size="sm"
            className="p-0 mt-2 typo-subtitle-md text-gray-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  ) : null;
};

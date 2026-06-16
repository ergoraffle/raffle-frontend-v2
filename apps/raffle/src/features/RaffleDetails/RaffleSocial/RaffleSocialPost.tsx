'use client';

import { useEffect, useRef, useState } from 'react';

import { ExternalLink, X } from '@ergo-raffle/icons';
import { Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { loadTwitterWidgets } from './loadTwitterWidgets';

export type RaffleSocialPostProps = {
  /** Numeric tweet id (string to preserve precision) used by the X embed. */
  tweetId: string;
  /** Author handle without the leading "@" (used for attribution + fallback). */
  authorHandle: string;
  /** Canonical link back to the post on X (status URL). */
  url: string;
};

/** Rendering lifecycle for a single embedded post. */
type EmbedState = 'loading' | 'rendered' | 'fallback';

/**
 * Renders one X.com post as an official embed via `widgets.js`.
 *
 * The embed is the policy-safe render path: X fetches the live content, so we
 * never store or replay the tweet body, and deletions are honored automatically
 * (a removed tweet simply fails to render). Loading and any failure — script
 * blocked, provider down, or tweet unavailable — degrade gracefully to a small
 * attribution card linking back to X, so a single bad post never blanks the feed.
 */
export const RaffleSocialPost = ({ tweetId, authorHandle, url }: RaffleSocialPostProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<EmbedState>('loading');

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const twttr = await loadTwitterWidgets();
        const target = containerRef.current;
        if (cancelled || !target) return;

        // Match the embed chrome to the current app theme (next-themes sets the
        // `dark` class on <html>). `dnt: true` opts the embed out of tracking.
        const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const created = await twttr.widgets.createTweet(tweetId, target, {
          theme,
          dnt: true,
          conversation: 'none',
          align: 'center'
        });

        if (cancelled) return;
        // `undefined` ⇒ the tweet could not be rendered (deleted/unavailable).
        setState(created ? 'rendered' : 'fallback');
      } catch {
        if (!cancelled) setState('fallback');
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [tweetId]);

  return (
    <div className="w-full">
      {/* The embed mounts here. Kept in the DOM so widgets.js has a target. */}
      <div ref={containerRef} className={state === 'rendered' ? 'block' : 'hidden'} />

      {state === 'loading' && <Skeleton className="h-40 w-full rounded-md" />}

      {state === 'fallback' && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-md border border-gray-4 p-3 transition-colors hover:bg-black-4"
        >
          <span className="flex items-center gap-2 min-w-0">
            <X className="size-5 shrink-0" />
            <Typography variant="body-sm" className="truncate" asChild>
              <span>@{authorHandle} on X</span>
            </Typography>
          </span>
          <ExternalLink className="size-4 shrink-0 text-gray-1" />
        </a>
      )}
    </div>
  );
};

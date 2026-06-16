'use client';

import { useEffect, useState } from 'react';

import { Clipboard, X } from '@ergo-raffle/icons';
import { Button, Skeleton, Typography, toast } from '@ergo-raffle/ui-kit';

import { ERGORAFFLE_X_HANDLE } from '@/constants';

/** Friendly default body for the pre-filled compose box (mention included). */
const INTENT_TEXT = `Check out this raffle on @${ERGORAFFLE_X_HANDLE}!`;

/**
 * Builds the one-tap X compose ("intent") URL, pre-filled so the post is always
 * correctly formed for discovery: the `@ergoraffle` mention lives in the text
 * and the raffle URL is passed as `url`. The poller buckets the post by that
 * raffle URL (the identifier); the mention is an extra discovery prong, not
 * required — so a user never has to assemble anything.
 *
 * @param raffleUrl - The canonical raffle page URL (this page's own URL).
 * @returns A fully-qualified `https://x.com/intent/tweet?...` link.
 */
const buildIntentUrl = (raffleUrl: string): string => {
  const params = new URLSearchParams({ text: INTENT_TEXT, url: raffleUrl });
  return `https://x.com/intent/tweet?${params.toString()}`;
};

/**
 * The "how to post" micro-guide shown in the Social Activity section.
 *
 * Leads with a one-tap "Post on X" button (pre-filled with the raffle link +
 * `@ergoraffle` mention) so the convention is impossible to get wrong, followed
 * by a terse 2-step recap and a copy-the-link fallback. Copy reflects that posts
 * are third-party and surface automatically within the poll interval — there is
 * no submission step.
 */
export const RaffleSocialHowTo = () => {
  // Resolved on the client only (matches RaffleShareButton's URL source).
  const [raffleUrl, setRaffleUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') setRaffleUrl(window.location.href);
  }, []);

  /** Copies the raffle link so users can paste it into a post manually. */
  const handleCopyLink = () => {
    if (!raffleUrl) return;
    navigator.clipboard.writeText(raffleUrl).then(() => {
      toast.success('Raffle link copied!');
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Typography variant="heading-5" asChild>
          <h3>Post about this raffle</h3>
        </Typography>
        <Typography variant="body-sm" className="text-gray-1">
          Share it on X with the raffle link and a tag to @{ERGORAFFLE_X_HANDLE} — it shows up here
          automatically, usually within half an hour.
        </Typography>
      </div>

      {raffleUrl ? (
        <Button variant="primary" size="lg" className="w-full" asChild>
          <a href={buildIntentUrl(raffleUrl)} target="_blank" rel="noopener noreferrer">
            <X />
            Post on X
          </a>
        </Button>
      ) : (
        <Skeleton className="h-10 w-full rounded-md sm:h-14" />
      )}

      <ol className="flex flex-col gap-1 pl-1">
        <Typography variant="body-sm" className="text-gray-1" asChild>
          <li>
            1. Tap “Post on X” — the link and @{ERGORAFFLE_X_HANDLE} tag are filled in for you.
          </li>
        </Typography>
        <Typography variant="body-sm" className="text-gray-1" asChild>
          <li>2. Add your thoughts and post. It appears below after the next refresh.</li>
        </Typography>
      </ol>

      <button
        type="button"
        onClick={handleCopyLink}
        disabled={!raffleUrl}
        className="flex items-center gap-2 self-start text-gray-1 transition-colors hover:text-foreground disabled:opacity-50"
      >
        <Clipboard className="size-4" />
        <Typography variant="body-sm" asChild>
          <span>Copy raffle link</span>
        </Typography>
      </button>
    </div>
  );
};

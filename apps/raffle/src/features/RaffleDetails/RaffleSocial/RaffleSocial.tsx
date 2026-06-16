'use client';

import { useState } from 'react';

import { AlertTriangle } from '@ergo-raffle/icons';
import { Pagination, Skeleton, Typography } from '@ergo-raffle/ui-kit';

import { useFetchSocial } from '@/hooks';

import { RaffleSocialHowTo } from './RaffleSocialHowTo';
import { RaffleSocialPost } from './RaffleSocialPost';

export type RaffleSocialProps = {
  /** Canonical raffle id — same value used by the route and the API fetch. */
  raffleId: string;
};

/** Posts per page. Embeds are heavy, so the page size is kept small. */
const PER_PAGE = 5;

/**
 * Social Activity feed for a raffle: X.com posts that tag `@ergoraffle` and
 * link to this raffle, discovered automatically by the backend poller and read
 * through our API (never X directly).
 *
 * Always leads with the "how to post" manual — it is both the call to action
 * for the common empty case and a persistent invitation when posts exist. Below
 * it the feed handles every state explicitly:
 *  - loading  → skeletons (no layout shift)
 *  - empty    → a gentle prompt (the manual above is the real CTA)
 *  - error    → a non-blocking notice; the manual stays usable
 *  - populated→ the list of embedded posts + pagination
 *
 * A disclaimer makes clear these third-party posts are not endorsed or verified
 * by ErgoRaffle.
 */
export const RaffleSocial = ({ raffleId }: RaffleSocialProps) => {
  // 1-based page index, matching the ui-kit Pagination component.
  const [page, setPage] = useState(1);
  const offset = (page - 1) * PER_PAGE;

  const { data, error, isLoading } = useFetchSocial(raffleId, {
    offset,
    limit: PER_PAGE
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const hasPosts = items.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <RaffleSocialHowTo />

      <hr className="border-gray-4" />

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-40 w-full rounded-md" />
          </>
        ) : error ? (
          // Provider/API hiccup: never blank the section — keep the manual above
          // usable and explain the feed will return.
          <div className="flex items-center gap-2 text-gray-1">
            <AlertTriangle className="size-5 shrink-0" />
            <Typography variant="body-sm">
              Couldn’t load posts right now. Please check back shortly.
            </Typography>
          </div>
        ) : hasPosts ? (
          items.map((post) => (
            <RaffleSocialPost
              key={post.tweetId}
              tweetId={post.tweetId}
              authorHandle={post.authorHandle}
              url={post.url}
            />
          ))
        ) : (
          <Typography variant="body-sm" className="text-gray-1">
            No posts yet — be the first to share this raffle on X.
          </Typography>
        )}
      </div>

      {!isLoading && !error && total > PER_PAGE ? (
        <Pagination
          page={page}
          perPage={PER_PAGE}
          perPageStep={PER_PAGE}
          total={total}
          align="side"
          onChangePage={setPage}
          // Page size is fixed for this feed; expose the prop as a no-op.
          onChangePerPage={() => undefined}
        />
      ) : null}

      {/*
        Compliance disclaimer — rendered unconditionally so it is present in
        every state (loading / empty / error / populated). The empty state is
        the common case for a fresh raffle, and content rules require posts be
        labelled third-party / not endorsed / not verified at all times.
      */}
      <Typography variant="body-sm" className="text-xs text-gray-1">
        Posts are from third parties on X and are not endorsed or verified by ErgoRaffle.
      </Typography>
    </div>
  );
};

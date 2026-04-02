'use client';

import { Share } from '@ergo-raffle/icons';
import { Button, Skeleton, toast } from '@ergo-raffle/ui-kit';

export type RaffleShareButtonProps = { loading?: boolean };

export const RaffleShareButton = ({ loading }: RaffleShareButtonProps) => {
  const handleShareClick = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Copied!');
      })
      .catch(() => {
        toast.error('Copy failed!');
      });
  };

  return loading ? (
    <Skeleton className="rounded-full size-12" />
  ) : (
    <>
      <Button variant="rounded" size="icon" className="hidden sm:flex" onClick={handleShareClick}>
        <Share />
      </Button>
      <Button variant="plain" size="icon" className="sm:hidden" onClick={handleShareClick}>
        <Share />
      </Button>
    </>
  );
};

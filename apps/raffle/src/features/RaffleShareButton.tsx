'use client';

import { Share } from '@ergo-raffle/icons';
import { Button, Skeleton } from '@ergo-raffle/ui-kit';
import { toast } from 'sonner';

export type RaffleShareButtonProps = { loading?: boolean };

export const RaffleShareButton = ({ loading }: RaffleShareButtonProps) => {
  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success('Copied!');
      })
      .catch((err) => {
        toast.error('Error!', err);
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

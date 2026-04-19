'use client';

import { useEffect, useState } from 'react';

import { Pin } from '@ergo-raffle/icons';
import { Button, Skeleton, toast } from '@ergo-raffle/ui-kit';

export type RafflePinButtonProps = {
  loading?: boolean;
  raffleId?: string;
};

export const PINED_RAFFLES_STORAGE_KEY = 'pinned_raffles';

export const RafflePinButton = ({ loading, raffleId }: RafflePinButtonProps) => {
  const [pined, setPined] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !raffleId) return;

    const stored = localStorage.getItem(PINED_RAFFLES_STORAGE_KEY);
    const items: string[] = stored ? JSON.parse(stored) : [];

    if (Array.isArray(items) && items.includes(raffleId)) {
      setPined(true);
    }
  }, [raffleId]);

  const handlePinClick = () => {
    if (typeof window === 'undefined' || !raffleId) return;

    try {
      const stored = localStorage.getItem(PINED_RAFFLES_STORAGE_KEY);
      let items: string[] = stored ? JSON.parse(stored) : [];

      if (!Array.isArray(items)) items = [];

      let updated: string[];

      if (items.includes(raffleId)) {
        updated = items.filter((id) => id !== raffleId);
        setPined(false);
        toast.success('Unpinned!');
      } else {
        updated = [...items, raffleId];
        setPined(true);
        toast.success('Pinned!');
      }

      localStorage.setItem(PINED_RAFFLES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      toast.error('Something went wrong, please try again later!');
    }
  };

  return loading ? (
    <Skeleton className="rounded-full size-12" />
  ) : (
    <>
      <Button
        variant="rounded"
        size="icon"
        className={`hidden sm:flex ${pined ? 'bg-primary-4' : ''}`}
        onClick={handlePinClick}
      >
        <Pin />
      </Button>
      <Button
        variant="plain"
        size="icon"
        className={`sm:hidden ${pined ? 'text-primary-4' : ''}`}
        onClick={handlePinClick}
      >
        <Pin />
      </Button>
    </>
  );
};

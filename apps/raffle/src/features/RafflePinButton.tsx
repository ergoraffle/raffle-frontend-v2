'use client';

import { Pin } from '@ergo-raffle/icons';
import { Button, Skeleton } from '@ergo-raffle/ui-kit';
import { toast } from 'sonner';

export type RafflePinButtonProps = {
  initialPined?: boolean;
  loading?: boolean;
};
export const RafflePinButton = ({ initialPined, loading }: RafflePinButtonProps) => {
  // Static
  const handlePinClick = () => {
    toast.success('Pined!');
  };
  return loading ? (
    <Skeleton className="rounded-full size-12" />
  ) : (
    <>
      <Button
        variant="rounded"
        size="icon"
        className={`hidden sm:flex ${initialPined ? 'bg-primary-4' : ''}`}
        onClick={handlePinClick}
      >
        <Pin />
      </Button>
      <Button
        variant="plain"
        size="icon"
        className={`sm:hidden ${initialPined ? 'text-primary-4' : ''}`}
        onClick={handlePinClick}
      >
        <Pin />
      </Button>
    </>
  );
};

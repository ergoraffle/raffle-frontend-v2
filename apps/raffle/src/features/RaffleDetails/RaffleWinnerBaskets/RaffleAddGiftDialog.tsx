'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import type { RaffleDetailView } from '@/features/RaffleDetails/raffleToViewModel';

import { RaffleAddGiftForm } from './RaffleAddGiftForm';

export type RaffleAddGiftDialogProps = {
  open: boolean;
  initialBasketNumber?: number;
  onOpenChange: (open: boolean) => void;
  basketsCount?: number;
  raffle: RaffleDetailView;
};

export const RaffleAddGiftDialog = ({
  open,
  initialBasketNumber,
  onOpenChange,
  basketsCount,
  raffle
}: RaffleAddGiftDialogProps) => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Which Basket do you want to add Gift to?</SheetTitle>
        </SheetHeader>
        <RaffleAddGiftForm
          initialBasketNumber={initialBasketNumber}
          basketsCount={basketsCount}
          raffle={raffle}
          onCloseDialog={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-125 lg:min-w-3xl">
        <DialogHeader>
          <DialogTitle>Which Basket do you want to add Gift to?</DialogTitle>
        </DialogHeader>
        <RaffleAddGiftForm
          initialBasketNumber={initialBasketNumber}
          basketsCount={basketsCount}
          raffle={raffle}
          onCloseDialog={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

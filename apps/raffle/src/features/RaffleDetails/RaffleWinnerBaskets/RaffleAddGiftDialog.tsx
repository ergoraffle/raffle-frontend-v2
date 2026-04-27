'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import { RaffleAddGiftForm } from './RaffleAddGiftForm';

export type RaffleAddGiftDialogProps = {
  open: boolean;
  initialBasketNumber?: number;
  onOpenChange: (open: boolean) => void;
  basketsCount?: number;
  raffleId: string;
};

export const RaffleAddGiftDialog = ({
  open,
  initialBasketNumber,
  onOpenChange,
  basketsCount,
  raffleId
}: RaffleAddGiftDialogProps) => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Which Basket do you want to add Gift to?">
        <RaffleAddGiftForm
          initialBasketNumber={initialBasketNumber}
          basketsCount={basketsCount}
          raffleId={raffleId}
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
          raffleId={raffleId}
          onCloseDialog={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

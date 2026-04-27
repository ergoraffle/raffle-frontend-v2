'use client';

import { useState } from 'react';

import { Left, Plus } from '@ergo-raffle/icons';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetFooter,
  Typography,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import type { RaffleDetailView } from '@/features/RaffleDetails/raffleToViewModel';

import { RaffleAddGiftForm } from './RaffleAddGiftForm';
import { RaffleWinnerBasketInfo } from './RaffleWinnerBasketInfo';
import { WinnerBasketCarousel } from './WinnerBasketCarousel';

export type RaffleWinnerBasketInfoDialogProps = {
  open: boolean;
  raffle: RaffleDetailView;
  initialBasketId: number;
  onOpenChange: (open: boolean) => void;
};

export const RaffleWinnerBasketInfoDialog = ({
  open,
  raffle,
  initialBasketId,
  onOpenChange
}: RaffleWinnerBasketInfoDialogProps) => {
  const { isMobile } = useBreakpoint();
  const [activeBasketId, setActiveBasketId] = useState<number>(initialBasketId);
  const [step, setStep] = useState<1 | 2>(1);
  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Which Basket do you want to add Gift to?">
        <RaffleWinnerBasketInfo basketId={activeBasketId} />
        <SheetFooter>
          <Button onClick={() => setStep(2)}>
            <Plus className="size-6" />
            Add Gift
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-125 lg:min-w-3xl">
        <DialogHeader>
          <DialogTitle asChild>
            <div className="w-full">
              {step === 2 ? (
                <Button variant="plain" onClick={() => setStep(1)} size="sm">
                  <Left className="size-6" />
                  Add Gift
                </Button>
              ) : (
                <div className="mx-auto md:w-1/2">
                  <WinnerBasketCarousel
                    raffleId={raffle.id}
                    setActiveBasketId={setActiveBasketId}
                  />
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        {step === 2 ? (
          <div className="space-y-5">
            <Typography variant="heading-5">Which Basket do you want to add Gift to?</Typography>
            <RaffleAddGiftForm
              initialBasketNumber={activeBasketId}
              raffle={raffle}
              onCloseDialog={() => onOpenChange(false)}
            />
          </div>
        ) : (
          <>
            <RaffleWinnerBasketInfo basketId={activeBasketId} />
            <DialogFooter>
              <Button className="w-1/2 mx-auto" onClick={() => setStep(2)}>
                <Plus className="size-6" />
                Add Gift
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

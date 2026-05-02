'use client';

import { useMemo, useState } from 'react';

import type { TokenSummary } from '@ergo-raffle/client';
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
  toast,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import type { RaffleDetailView } from '@/features/RaffleDetails/raffleToViewModel';
import { useFetchWinnerBaskets, useWallet } from '@/hooks';
import { getErrorMessage } from '@/lib';

import { RaffleAddGiftForm } from './RaffleAddGiftForm';
import { RaffleWinnerBasketInfo } from './RaffleWinnerBasketInfo';
import { WinnerBasketSlider } from './WinnerBasketSlider';

export type RaffleWinnerBasketInfoDialogProps = {
  open: boolean;
  raffle: RaffleDetailView;
  initialBasketId: number;
  onOpenChange: (open: boolean) => void;
  giftTokens?: TokenSummary[];
  totalBaskets?: number;
};

export const RaffleWinnerBasketInfoDialog = ({
  open,
  raffle,
  initialBasketId,
  onOpenChange,
  giftTokens,
  totalBaskets
}: RaffleWinnerBasketInfoDialogProps) => {
  const { isMobile } = useBreakpoint();
  const [step, setStep] = useState<1 | 2>(1);
  const { ensureConnected } = useWallet();

  const [activeBasketIndex, setActiveBasketIndex] = useState<number>(initialBasketId);

  const params = useMemo(() => ({ index: activeBasketIndex }), [activeBasketIndex]);
  const { data: activeBasketData, isLoading: activeBasketDataIsLoading } = useFetchWinnerBaskets(
    raffle.id,
    params
  );

  const handleClickAddGift = () => {
    try {
      ensureConnected('Nautilus');
      setStep(2);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const activeBasket = useMemo(
    () => (activeBasketData && activeBasketData?.total > 0 ? activeBasketData.items[0] : undefined),
    [activeBasketData]
  );

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Which Basket do you want to add Gift to?">
        {activeBasket ? (
          <>
            <RaffleWinnerBasketInfo
              basket={activeBasket}
              basketLoading={activeBasketDataIsLoading}
              raffle={raffle}
            />
            <SheetFooter>
              <Button onClick={() => setStep(2)}>
                <Plus className="size-6" />
                Add Gift
              </Button>
            </SheetFooter>
          </>
        ) : (
          'not found'
        )}
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
                <WinnerBasketSlider
                  setActiveBasketIndex={setActiveBasketIndex}
                  basket={activeBasket}
                  isLoading={activeBasketDataIsLoading}
                  totalBaskets={totalBaskets}
                />
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        {step === 2 ? (
          <div className="space-y-5">
            <Typography variant="heading-5">Which Basket do you want to add Gift to?</Typography>
            <RaffleAddGiftForm
              initialBasketNumber={activeBasket?.index}
              raffle={raffle}
              onCloseDialog={() => onOpenChange(false)}
            />
          </div>
        ) : (
          <>
            <RaffleWinnerBasketInfo
              basket={activeBasket}
              basketLoading={activeBasketDataIsLoading}
              raffle={raffle}
              giftTokens={giftTokens}
            />
            <DialogFooter>
              <Button
                className="w-1/2 mx-auto"
                onClick={handleClickAddGift}
                disabled={activeBasketDataIsLoading}
              >
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

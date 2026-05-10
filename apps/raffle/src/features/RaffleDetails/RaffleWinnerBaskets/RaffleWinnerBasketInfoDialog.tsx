'use client';

import { useState } from 'react';

import type {
  GetRaffleRaffleIdBasket200ItemsItem,
  GetTokens200ItemsItem
} from '@ergo-raffle/client';
import { Left, Plus } from '@ergo-raffle/icons';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  getErrorMessage,
  Sheet,
  SheetContent,
  SheetFooter,
  Typography,
  toast,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import type { RaffleDetailView } from '@/features/RaffleDetails/raffleToViewModel';
import { useWallet } from '@/hooks';

import { RaffleAddGiftForm } from './RaffleAddGiftForm';
import { RaffleWinnerBasketInfo } from './RaffleWinnerBasketInfo';
import { WinnerBasketSlider } from './WinnerBasketSlider';

export type RaffleWinnerBasketInfoDialogProps = {
  open: boolean;
  raffle: RaffleDetailView;
  onOpenChange: (open: boolean) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  hasNext: boolean;
  giftTokens?: GetTokens200ItemsItem[];
  basket?: GetRaffleRaffleIdBasket200ItemsItem;
  loading?: boolean;
};

export const RaffleWinnerBasketInfoDialog = ({
  open,
  raffle,
  onNextSlide,
  onPrevSlide,
  hasNext,
  onOpenChange,
  giftTokens,
  basket,
  loading
}: RaffleWinnerBasketInfoDialogProps) => {
  const { isMobile } = useBreakpoint();
  const [step, setStep] = useState<1 | 2>(1);
  const { ensureConnected } = useWallet();

  const handleClickAddGift = () => {
    try {
      ensureConnected('Nautilus');
      setStep(2);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Basket">
        {step === 2 ? (
          <div className="space-y-5">
            <Typography variant="heading-5">Which Basket do you want to add Gift to?</Typography>
            <RaffleAddGiftForm
              initialBasketNumber={basket?.index}
              raffle={raffle}
              onCloseDialog={() => onOpenChange(false)}
            />
          </div>
        ) : (
          <>
            <RaffleWinnerBasketInfo
              basket={basket}
              basketLoading={loading}
              raffle={raffle}
              giftTokens={giftTokens}
            />
            <SheetFooter>
              <Button className="w-1/2 mx-auto" onClick={handleClickAddGift} disabled={loading}>
                <Plus className="size-6" />
                Add Gift
              </Button>
            </SheetFooter>
          </>
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
                  onNextSlide={onNextSlide}
                  onPrevSlide={onPrevSlide}
                  hasNext={hasNext}
                  basket={basket}
                  loading={loading}
                />
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        {step === 2 ? (
          <div className="space-y-5">
            <Typography variant="heading-5">Which Basket do you want to add Gift to?</Typography>
            <RaffleAddGiftForm
              initialBasketNumber={basket?.index}
              raffle={raffle}
              onCloseDialog={() => onOpenChange(false)}
            />
          </div>
        ) : (
          <>
            <RaffleWinnerBasketInfo
              basket={basket}
              basketLoading={loading}
              raffle={raffle}
              giftTokens={giftTokens}
            />
            <DialogFooter>
              <Button className="w-1/2 mx-auto" onClick={handleClickAddGift} disabled={loading}>
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

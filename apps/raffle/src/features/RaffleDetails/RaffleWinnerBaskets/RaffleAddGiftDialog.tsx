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
import type { InfoBlockchainResponse, TokenSummary } from '@ergo-raffle/client';

export type RaffleAddGiftDialogProps = {
  open: boolean;
  initialBasketNumber?: number;
  onOpenChange: (open: boolean) => void;
  tokensList: TokenSummary[];
  infoBlockchainData: InfoBlockchainResponse;
};

export const RaffleAddGiftDialog = ({
  open,
  initialBasketNumber,
  onOpenChange,
  tokensList
}: RaffleAddGiftDialogProps) => {
  const { isMobile } = useBreakpoint();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title="Which Basket do you want to add Gift to?">
        <RaffleAddGiftForm initialBasketNumber={initialBasketNumber} tokensList={tokensList} />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-125 lg:min-w-3xl">
        <DialogHeader>
          <DialogTitle>Which Basket do you want to add Gift to?</DialogTitle>
        </DialogHeader>
        <RaffleAddGiftForm initialBasketNumber={initialBasketNumber} tokensList={tokensList} />
      </DialogContent>
    </Dialog>
  );
};

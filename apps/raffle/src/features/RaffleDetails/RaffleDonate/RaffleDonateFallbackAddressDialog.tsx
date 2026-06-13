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

import { useDonate } from '@/hooks';

import { RaffleDonateFallbackAddressForm } from './RaffleDonateFallbackAddressForm';

export const RaffleDonateFallbackAddressDialog = () => {
  const { isMobile } = useBreakpoint();
  const { isFallbackDialogOpen: open, setIsFallbackDialogOpen: onOpenChange } = useDonate();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ergo Address</SheetTitle>
        </SheetHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
          <RaffleDonateFallbackAddressForm />
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Ergo Address</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
          <RaffleDonateFallbackAddressForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

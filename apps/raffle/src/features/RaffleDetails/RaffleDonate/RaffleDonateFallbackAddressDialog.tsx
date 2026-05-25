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
          <SheetTitle>Fallback Address</SheetTitle>
        </SheetHeader>
        <RaffleDonateFallbackAddressForm />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[90vw] lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Fallback Address</DialogTitle>
        </DialogHeader>
        <RaffleDonateFallbackAddressForm />
      </DialogContent>
    </Dialog>
  );
};

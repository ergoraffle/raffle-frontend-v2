'use client';

import type { GetRaffleRaffleId200 } from '@ergo-raffle/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  toast,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import { useDonate } from '@/hooks';

import { RaffleDonateNetworkSelect } from './RaffleDonateNetworkSelect';
import { RaffleDonateTicketPrice } from './RaffleDonateTicketPrice';

export type RaffleDonateNetworkSelectDialogProps = {
  raffle: GetRaffleRaffleId200;
};

export const RaffleDonateNetworkSelectDialog = ({
  raffle
}: RaffleDonateNetworkSelectDialogProps) => {
  const { isMobile } = useBreakpoint();
  const {
    isSelectNetworkDialogOpen: open,
    setIsSelectNetworkDialogOpen: onOpenChange,
    ticketCount
  } = useDonate();

  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Fallback Address</SheetTitle>
        </SheetHeader>
        <RaffleDonateTicketPrice raffle={raffle} ticketCount={ticketCount} />
        <RaffleDonateNetworkSelect />
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        toast.error('ddd');
        onOpenChange(v);
      }}
    >
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>Buying {ticketCount} Ticket</DialogTitle>
        </DialogHeader>
        <RaffleDonateTicketPrice raffle={raffle} ticketCount={ticketCount} />
        <RaffleDonateNetworkSelect />
      </DialogContent>
    </Dialog>
  );
};

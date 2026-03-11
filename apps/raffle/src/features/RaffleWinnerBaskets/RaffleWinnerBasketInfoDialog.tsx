import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ergo-raffle/ui-kit';

export type RaffleWinnerBasketInfoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RaffleWinnerBasketInfoDialog = ({
  open,
  onOpenChange
}: RaffleWinnerBasketInfoDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="min-w-lg">
      <DialogHeader>
        <DialogTitle>Info</DialogTitle>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

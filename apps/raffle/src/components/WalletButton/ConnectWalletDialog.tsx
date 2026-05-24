import type { ReactNode } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

export type ConnectWalletDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | ReactNode;
  description?: string;
  children?: React.ReactNode;
  dialogMinWidth?: string;
};

export const ConnectWalletDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  dialogMinWidth
}: ConnectWalletDialogProps) => {
  const { isMobile } = useBreakpoint();
  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {!!description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogMinWidth || 'min-w-xl'}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!!description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

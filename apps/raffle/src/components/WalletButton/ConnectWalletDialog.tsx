import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

export type ConnectWalletDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const ConnectWalletDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children
}: ConnectWalletDialogProps) => {
  const { isMobile } = useBreakpoint();
  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={title}>{children}</SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {!!description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

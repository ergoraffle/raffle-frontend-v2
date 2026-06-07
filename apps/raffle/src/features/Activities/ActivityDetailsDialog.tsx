import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Identifier,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

import { getAddressUrl } from '@/lib';

import { ActivityDetailsItem } from './ActivityDetailsItem';

export type ActivityDetailsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ActivityDetailsDialog = ({ open, onOpenChange }: ActivityDetailsDialogProps) => {
  const { isMobile } = useBreakpoint();
  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Activity Details</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-170 lg:max-w-198 xl:max-w-243">
        <DialogHeader>
          <DialogTitle className="text-center">
            Ticket #7 - #12 Returned to{' '}
            <Identifier
              value="hsrjhguizfgpijweogksfoboghjnogmnlomngdm"
              href={getAddressUrl('hsrjhguizfgpijweogksfoboghjnogmnlomngdm')}
              size="lg"
              className="max-w-28 text-secondary-1"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-1.5">
          <ActivityDetailsItem />
          <ActivityDetailsItem />
          <ActivityDetailsItem />
        </div>
      </DialogContent>
    </Dialog>
  );
};

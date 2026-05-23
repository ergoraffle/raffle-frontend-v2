'use client';

import { useState } from 'react';

import { Downvote, Upvote, Votes } from '@ergo-raffle/icons';
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Typography,
  useBreakpoint
} from '@ergo-raffle/ui-kit';

export type RaffleVoteProps = {
  raffleId: string;
  raffleTitle: string;
};

export const RaffleVote = ({ raffleTitle }: RaffleVoteProps) => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  return (
    <>
      <Button size="icon-sm" variant="plain" onClick={() => setOpen(true)} disabled>
        <Votes className="size-7" />
      </Button>
      {isMobile ? (
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>“{raffleTitle}” Raffle</SheetTitle>
            </SheetHeader>
            <Typography className="lg:max-w-md m-auto">
              Vote this Raffle, some text: vote based on this and that, only vote up if you really
              trust the author, vote down to report spam.
            </Typography>
            <SheetFooter className="flex-row">
              <Button variant="error" className="flex-1">
                <Downvote />
                Downvote
              </Button>
              <Button variant="success" className="flex-1">
                <Upvote />
                Upvote
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="lg:min-w-xl text-center bg-transparent p-0">
            <Card className="relative z-109">
              <DialogHeader>
                <DialogTitle>“{raffleTitle}” Raffle</DialogTitle>
              </DialogHeader>
              <Typography className="lg:max-w-md m-auto">
                Vote this Raffle, some text: vote based on this and that, only vote up if you really
                trust the author, vote down to report spam.
              </Typography>
            </Card>
            <DialogFooter className="flex-row">
              <Button variant="error" className="flex-1">
                <Downvote />
                Downvote
              </Button>
              <Button variant="success" className="flex-1">
                <Upvote />
                Upvote
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

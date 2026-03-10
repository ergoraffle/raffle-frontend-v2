'use client';
import { useState } from 'react';
import { RaffleAddGiftDialog } from './RaffleAddGiftDialog';
import { Badge, BasketStatus, Button } from '@ergo-raffle/ui-kit';
import { Plus } from '@ergo-raffle/icons';

export const RaffleWinnerBasketsFilters = () => {
  const [addGiftDialog, setAddGiftDialog] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center my-3">
        <div className="space-x-2">
          <Badge variant="elevated" size="sm" asChild>
            <Button>
              <BasketStatus filled />
              Share
            </Button>
          </Badge>
          <Badge variant="elevated" size="sm" asChild>
            <Button>
              <BasketStatus />
              Empty
            </Button>
          </Badge>
          <Badge variant="elevated" size="sm" asChild>
            <Button>
              <BasketStatus hasGift />
              Gift
            </Button>
          </Badge>
          <Badge variant="elevated" size="sm" asChild>
            <Button>
              <BasketStatus filled hasGift />
              Share+ Gift
            </Button>
          </Badge>
        </div>
        <Button variant="primary-soft" onClick={() => setAddGiftDialog(true)}>
          <Plus />
          Add Gift
        </Button>
      </div>
      <RaffleAddGiftDialog open={addGiftDialog} onOpenChange={setAddGiftDialog} />
    </>
  );
};

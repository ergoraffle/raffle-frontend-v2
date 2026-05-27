'use client';

import type { GetRaffleRaffleIdBasket200ItemsItem } from '@ergo-raffle/client';
import { Right } from '@ergo-raffle/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Empty,
  Skeleton,
  Typography
} from '@ergo-raffle/ui-kit';

import { useFetchWinnerBasketTransactions } from '@/hooks';

import type { RaffleDetailView } from '../raffleToViewModel';
import { TransactionItem } from './TransactionItem';

export type RaffleWinnerBasketInfoDialogProps = {
  basket: GetRaffleRaffleIdBasket200ItemsItem;
  raffle: RaffleDetailView;
};

export const RaffleWinnerBasketTransactions = ({
  basket,
  raffle
}: RaffleWinnerBasketInfoDialogProps) => {
  const { data: transactions, isLoading } = useFetchWinnerBasketTransactions(
    raffle.id,
    basket.index
  );
  return (
    <div className="space-y-3">
      {isLoading ? (
        <Skeleton className="h-12.5 w-full" />
      ) : transactions ? (
        <Collapsible className="rounded-sm data-[state=open]:bg-gray-5">
          <CollapsibleTrigger asChild>
            <div className="flex justify-between  border border-gray-5 rounded-sm p-3 group data-[state=open]:border-0 cursor-pointer hover:border-gray-4">
              <Typography variant="body-lg">Transactions</Typography>
              <Right className="size-5 group-data-[state=open]:rotate-90" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 space-y-2 pb-2">
            {transactions.items.length ? (
              <div className="max-h-32 overflow-y-auto scrollbar-hide space-y-2">
                {transactions.items.map((transaction) => (
                  <TransactionItem transaction={transaction} key={transaction.timestamp} />
                ))}
              </div>
            ) : (
              <div className="bg-white-1 text-white-1-foreground px-2 py-1.5 rounded-sm">
                <Empty>
                  <Typography variant="heading-3">No matching results found.</Typography>
                </Empty>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </div>
  );
};

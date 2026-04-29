'use client';

import { Right } from '@ergo-raffle/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Skeleton,
  Typography
} from '@ergo-raffle/ui-kit';

import { useFetchWinnerBasket } from '@/hooks/useFetchWinnerBasket';

import { GiftItem } from './GiftItem';
import { TransactionItem } from './TransactionItem';

export type RaffleWinnerBasketInfoDialogProps = {
  basketId: number;
};

export const RaffleWinnerBasketInfo = ({ basketId }: RaffleWinnerBasketInfoDialogProps) => {
  const { data, isLoading } = useFetchWinnerBasket(basketId);
  return (
    <div className="space-y-3">
      {isLoading ? (
        <>
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </>
      ) : (
        <>
          <Typography variant="body-lg">
            {data?.sharePercent} Share of the winners Pot
            <Typography variant="subtitle-md" asChild>
              <span>
                ({data?.shareAmount} {data?.tokenName})
              </span>
            </Typography>
          </Typography>
          {data?.gifts ? (
            <Collapsible className="rounded-sm data-[state=open]:bg-gray-5">
              <CollapsibleTrigger asChild>
                <div className="flex justify-between  border border-gray-5 rounded-sm p-3 group data-[state=open]:border-0">
                  <Typography variant="body-lg">{data.gifts.length} Additional Gifts</Typography>
                  <Right className="size-5 group-data-[state=open]:rotate-90" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-2">
                <div className="bg-white-1 text-white-1-foreground px-2 py-1.5 rounded-sm">
                  {data.gifts.map((gift) => (
                    <GiftItem gift={gift} key={gift.amount} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : null}
          {data?.transactions ? (
            <Collapsible className="rounded-sm data-[state=open]:bg-gray-5">
              <CollapsibleTrigger asChild>
                <div className="flex justify-between  border border-gray-5 rounded-sm p-3 group data-[state=open]:border-0">
                  <Typography variant="body-lg">Transactions</Typography>
                  <Right className="size-5 group-data-[state=open]:rotate-90" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 space-y-2 pb-2">
                <div className="max-h-32 overflow-y-auto scrollbar-hide space-y-2">
                  {data.transactions.map((transaction) => (
                    <TransactionItem transaction={transaction} key={transaction.id} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : null}
        </>
      )}
    </div>
  );
};

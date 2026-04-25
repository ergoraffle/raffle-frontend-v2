'use client';

import { useState } from 'react';

import { Plus } from '@ergo-raffle/icons';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  Pagination,
  Skeleton,
  Typography
} from '@ergo-raffle/ui-kit';

import { useFetchWinnerBaskets, useWinnerBasketsParams } from '@/hooks';

import { RaffleAddGiftDialog } from './RaffleAddGiftDialog';
import { RaffleWinnerBasketInfoDialog } from './RaffleWinnerBasketInfoDialog';
import { RaffleWinnerBasketItem } from './RaffleWinnerBasketItem';
import { RaffleWinnerBasketsFilters } from './RaffleWinnerBasketsFilters';
import type { RaffleDetailResponseToken } from '@ergo-raffle/client';

export type RaffleWinnerBasketsProps = {
  raffleId: string;
  raffleToken: RaffleDetailResponseToken;
  winnerPotShareAmount: number;
};

export const RaffleWinnerBaskets = ({
  raffleId,
  raffleToken,
  winnerPotShareAmount
}: RaffleWinnerBasketsProps) => {
  const [basketInfoDialog, setBasketInfoDialog] = useState<number | null>(null);
  const [addGiftDialog, setAddGiftDialog] = useState<{
    open: boolean;
    initialBasketNumber?: number;
  }>({ open: false });
  const handleAddGiftDialogOpen = (open: boolean) => {
    setAddGiftDialog({ open });
  };
  const openAddGiftDialog = (initialBasketNumber?: number) => {
    setAddGiftDialog({
      open: true,
      initialBasketNumber
    });
  };
  const { pagination, onChangePage, onChangePerPage, params, onTypeFilterChange } =
    useWinnerBasketsParams();
  const { items, total, isLoading } = useFetchWinnerBaskets(raffleId, params);

  if (!isLoading && !items?.length) {
    return (
      <div className="flex justify-center items-center grow my-9">
        <Empty>
          <Typography variant="heading-3">No matching results found.</Typography>
        </Empty>
      </div>
    );
  }

  const firstColumn = items?.slice(0, 5);
  const secondColumn = items?.slice(5, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Winner Baskets
          <div className="sm:hidden">
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <Button variant="primary-soft" onClick={() => handleAddGiftDialogOpen(true)}>
                <Plus />
                Add Gift
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center my-3">
          <RaffleWinnerBasketsFilters
            isLoading={isLoading}
            params={params}
            onTypeFilterChange={onTypeFilterChange}
          />
          <div className="hidden sm:block">
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <Button variant="primary-soft" onClick={() => handleAddGiftDialogOpen(true)}>
                <Plus />
                Add Gift
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:flex-1">
            <div className="hidden sm:flex items-end border-b border-b-gray-5 mb-2.5 py-2.5">
              <Typography className="px-4 flex-1" variant="body-lg">
                Basket
              </Typography>
              <Typography className="px-4 flex-2" variant="body-lg">
                Share of Winners pot
              </Typography>
              <Typography className="px-4 flex-7" variant="body-lg">
                Additional Gifts
              </Typography>
            </div>
            <div className="space-y-2.5 pr-1.25">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <RaffleWinnerBasketItem key={index.toString()} loading />
                  ))
                : firstColumn?.map((basket) => (
                    <RaffleWinnerBasketItem
                      basket={basket}
                      key={basket.index}
                      handleOpenAddGiftDialog={openAddGiftDialog}
                      handleOpenInfoDialog={setBasketInfoDialog}
                      raffleToken={raffleToken}
                      winnerPotShareAmount={winnerPotShareAmount}
                    />
                  ))}
            </div>
          </div>
          {(secondColumn && secondColumn.length > 0) || isLoading ? (
            <div className="sm:flex-1">
              <div className="hidden sm:flex items-end border-b border-b-gray-5 mb-2.5 py-2.5">
                <Typography className="px-4 flex-1" variant="body-lg">
                  Basket
                </Typography>
                <Typography className="px-4 flex-2" variant="body-lg">
                  Share of Winners pot
                </Typography>
                <Typography className="px-4 flex-7" variant="body-lg">
                  Additional Gifts
                </Typography>
              </div>
              <div className="space-y-2.5 pl-1.25">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <RaffleWinnerBasketItem key={index.toString()} loading />
                    ))
                  : firstColumn?.map((basket) => (
                      <RaffleWinnerBasketItem
                        basket={basket}
                        key={basket.index}
                        handleOpenAddGiftDialog={openAddGiftDialog}
                        handleOpenInfoDialog={setBasketInfoDialog}
                        raffleToken={raffleToken}
                        winnerPotShareAmount={winnerPotShareAmount}
                      />
                    ))}
              </div>
            </div>
          ) : null}
        </div>
        {!isLoading && (
          <>
            {items && total ? (
              <Pagination
                page={pagination.page}
                perPage={pagination.perPage}
                onChangePerPage={onChangePage}
                onChangePage={onChangePerPage}
                total={total}
                align="side"
                className="mt-4"
              />
            ) : null}
            <RaffleAddGiftDialog
              open={addGiftDialog.open}
              onOpenChange={handleAddGiftDialogOpen}
              initialBasketNumber={addGiftDialog.initialBasketNumber}
            />
            {basketInfoDialog ? (
              <RaffleWinnerBasketInfoDialog
                open={Boolean(basketInfoDialog)}
                onOpenChange={() => setBasketInfoDialog(null)}
                initialBasketId={basketInfoDialog}
                raffleId={raffleId}
              />
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
};

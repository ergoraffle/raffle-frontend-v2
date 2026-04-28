'use client';

import { useMemo, useState } from 'react';

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
  Typography,
  toast
} from '@ergo-raffle/ui-kit';

import type { RaffleDetailView } from '@/features/RaffleDetails/raffleToViewModel';
import { useFetchWinnerBaskets, useWallet, useWinnerBasketsParams } from '@/hooks';
import { useFetchTokens } from '@/hooks/useFetchTokens';
import { getErrorMessage } from '@/lib';

import { RaffleAddGiftDialog } from './RaffleAddGiftDialog';
import { RaffleWinnerBasketInfoDialog } from './RaffleWinnerBasketInfoDialog';
import { RaffleWinnerBasketItem } from './RaffleWinnerBasketItem';
import { RaffleWinnerBasketsFilters } from './RaffleWinnerBasketsFilters';

export type RaffleWinnerBasketsProps = {
  raffle: RaffleDetailView;
};

export const RaffleWinnerBaskets = ({ raffle }: RaffleWinnerBasketsProps) => {
  const { ensureConnected } = useWallet();
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
  const { pagination, onChangePage, onChangePerPage, params, onTypeFilterChange, type } =
    useWinnerBasketsParams();
  const { data, isLoading } = useFetchWinnerBaskets(raffle.id, params);

  const firstColumn = data?.items?.slice(0, 5);
  const secondColumn = data?.items?.slice(5, 10);

  const fetchTokensParams = useMemo(
    () => ({
      tokenIds: data?.items?.flatMap((b) => b.gifts.map((g) => g.tokenId)) ?? []
    }),
    [data?.items]
  );

  const { data: giftTokens } = useFetchTokens(fetchTokensParams);

  const handleClickAddGift = (initialBasketNumber?: number) => {
    try {
      ensureConnected('Nautilus');
      openAddGiftDialog(initialBasketNumber);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Winner Baskets
          {raffle.status === 'active' && (
            <div className="sm:hidden">
              {isLoading ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <Button
                  variant="primary-soft"
                  onClick={() => handleClickAddGift(undefined)}
                  disabled={!data?.items?.length}
                >
                  <Plus />
                  Add Gift
                </Button>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center my-3">
          <RaffleWinnerBasketsFilters
            isLoading={isLoading}
            type={type}
            onTypeFilterChange={onTypeFilterChange}
          />
          {raffle.status === 'active' && (
            <div className="hidden sm:block">
              {isLoading ? (
                <Skeleton className="h-10 w-24" />
              ) : (
                <Button
                  variant="primary-soft"
                  onClick={() => handleClickAddGift(undefined)}
                  disabled={!data?.items?.length}
                >
                  <Plus />
                  Add Gift
                </Button>
              )}
            </div>
          )}
        </div>
        {!isLoading && !data?.items?.length ? (
          <div className="flex justify-center items-center grow my-9">
            <Empty>
              <Typography variant="heading-3">No matching results found.</Typography>
            </Empty>
          </div>
        ) : (
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
                        handleOpenAddGiftDialog={handleClickAddGift}
                        handleOpenInfoDialog={setBasketInfoDialog}
                        raffle={raffle}
                        giftTokens={giftTokens?.items}
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
                    : secondColumn?.map((basket) => (
                        <RaffleWinnerBasketItem
                          basket={basket}
                          key={basket.index}
                          handleOpenAddGiftDialog={handleClickAddGift}
                          handleOpenInfoDialog={setBasketInfoDialog}
                          raffle={raffle}
                          giftTokens={giftTokens?.items}
                        />
                      ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
        {!isLoading && (
          <>
            {data?.items && data?.total ? (
              <Pagination
                page={pagination.page}
                perPage={pagination.perPage}
                onChangePage={onChangePage}
                onChangePerPage={onChangePerPage}
                total={data?.total}
                align="side"
                className="mt-4"
              />
            ) : null}
            <RaffleAddGiftDialog
              open={addGiftDialog.open}
              onOpenChange={handleAddGiftDialogOpen}
              initialBasketNumber={addGiftDialog.initialBasketNumber}
              basketsCount={data?.items?.length}
              raffle={raffle}
            />
            {basketInfoDialog ? (
              <RaffleWinnerBasketInfoDialog
                open={Boolean(basketInfoDialog)}
                onOpenChange={() => setBasketInfoDialog(null)}
                initialBasketId={basketInfoDialog}
                raffle={raffle}
              />
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
};

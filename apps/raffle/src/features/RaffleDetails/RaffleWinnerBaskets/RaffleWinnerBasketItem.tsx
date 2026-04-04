import type { WinnerBasket } from '@ergo-raffle/client';
import { Plus } from '@ergo-raffle/icons';
import { BasketStatus, Button, Card, CardContent, Skeleton, Typography } from '@ergo-raffle/ui-kit';

export type RaffleWinnerBasketItemProps = {
  basket?: WinnerBasket;
  loading?: boolean;
  handleOpenAddGiftDialog?: (basketId?: string) => void;
  handleOpenInfoDialog?: (basketId: string) => void;
};

export const RaffleWinnerBasketItem = ({
  basket,
  loading,
  handleOpenAddGiftDialog,
  handleOpenInfoDialog
}: RaffleWinnerBasketItemProps) => (
  <Card className="group p-0">
    <CardContent className="flex items-center p-0">
      {loading ? (
        <div className="flex items-center min-h-19 grow">
          <div className="px-4 flex-1 flex space-x-4 items-center">
            <Skeleton className="size-6" />
            <Skeleton className="size-3" />
          </div>
          <div className="px-4 flex-2">
            <Skeleton className="w-12 h-3" />
          </div>
          <div className="px-4 flex-7 space-y-1">
            <Skeleton className="w-20 h-2" />
            <Skeleton className="w-25 h-2" />
          </div>
        </div>
      ) : basket ? (
        <>
          {/* biome-ignore lint/a11y: using div as button intentionally */}
          <div
            className="flex py-4 grow items-center min-h-19 group-hover:bg-black-4 rounded-lg cursor-pointer"
            onClick={() => handleOpenInfoDialog?.(basket.basketId)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenInfoDialog?.(basket.basketId);
              }
            }}
          >
            <div className="px-4 flex-1 flex space-x-4">
              <BasketStatus
                className="size-7"
                hasGift={Boolean(basket.gifts?.length)}
                filled={Boolean(basket.sharePercent)}
              />
              <Typography variant="heading-3">{basket.basketId}</Typography>
            </div>
            <div className="px-4 flex-2">
              <Typography variant="body-lg">{basket.sharePercent ?? 0}%</Typography>
              {basket.shareAmount ? (
                <Typography
                  variant="subtitle-md"
                  data-slot="share-amount"
                  className="text-gray-2 h-0 overflow-hidden transition-all transition-duration-300 group-hover:h-4"
                >
                  = {basket.shareAmount}
                </Typography>
              ) : null}
            </div>
            <div className="px-4 flex-7">
              {basket.gifts ? (
                <>
                  <div className="hidden sm:block">
                    {basket.gifts.slice(0, 2).map((gift) => (
                      <Typography key={gift.asset} variant="subtitle-md">
                        {gift.amount}X {gift.asset}
                      </Typography>
                    ))}

                    {basket.gifts.length > 2 ? (
                      <Typography className="text-gray-2 underline" variant="subtitle-md">
                        + {basket.gifts.length - 2} more Asset
                      </Typography>
                    ) : null}
                  </div>
                  <div className="sm:hidden">
                    <Typography className="text-gray-2 underline" variant="subtitle-md">
                      + {basket.gifts.length} Gifts
                    </Typography>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="sm:w-0 flex items-center justify-center overflow-hidden transition-all transition-duration-300 group-hover:w-10">
            <Button
              variant="plain"
              size="icon-xs"
              className="text-primary-1"
              onClick={() => handleOpenAddGiftDialog?.(basket.basketId)}
            >
              <Plus />
            </Button>
          </div>
        </>
      ) : null}
    </CardContent>
  </Card>
);

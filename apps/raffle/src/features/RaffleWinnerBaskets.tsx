import { getRafflesRaffleIdWinnerBaskets, withMock } from '@ergo-raffle/client';
import { Plus } from '@ergo-raffle/icons';
import {
  BasketStatus,
  Button,
  Card,
  CardContent,
  Empty,
  Typography
  //   Pagination
} from '@ergo-raffle/ui-kit';

export type RaffleWinnerBasketsProps = { raffleId: string };

export const RaffleWinnerBaskets = async ({ raffleId }: RaffleWinnerBasketsProps) => {
  const { items } = await withMock(async () => await getRafflesRaffleIdWinnerBaskets(raffleId));

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center grow">
        <Empty>
          <Typography variant="heading-3">No matching results found.</Typography>
        </Empty>
      </div>
    );
  }

  const firstColumn = items.slice(0, 5);
  const secondColumn = items.slice(5, 10);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <div className="flex items-end border-b border-b-gray-5 mb-2.5 py-2.5">
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
            {firstColumn.map((basket, index) => (
              <Card key={basket.basketId} className="group p-0">
                <CardContent className="flex items-center p-0">
                  <div className="flex py-4 grow items-center min-h-19 group-hover:bg-black-4 rounded-lg">
                    <div className="px-4 flex-1 flex space-x-4">
                      <BasketStatus
                        className="size-7"
                        hasGift={Boolean(basket.gifts?.length)}
                        filled={Boolean(basket.sharePercent)}
                      />
                      <Typography variant="heading-3">{index + 1}</Typography>
                    </div>
                    <div className="px-4 flex-2">
                      <Typography variant="body-lg">{basket.sharePercent ?? 0}%</Typography>
                      {basket.shareAmount ? (
                        <Typography
                          variant="subtitle-md"
                          data-slot="share-amount"
                          className="text-gray-2 h-0 overflow-hidden transition-all transition-duration-300 group-hover:h-4"
                        >
                          = {basket.shareAmount} {basket.tokenName}
                        </Typography>
                      ) : null}
                    </div>
                    <div className="px-4 flex-7">
                      {basket.gifts ? (
                        <>
                          {basket.gifts.slice(0, 2).map((gift) => (
                            <Typography key={gift.name} variant="subtitle-md">
                              {gift.amount}X {gift.name}
                            </Typography>
                          ))}

                          {basket.gifts.length > 2 ? (
                            <Typography className="text-gray-2 underline" variant="subtitle-md">
                              + {basket.gifts.length - 2} more Asset
                            </Typography>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-0  flex items-center justify-center overflow-hidden transition-all transition-duration-300 group-hover:w-10">
                    <Button variant="plain" size="icon-xs" className="text-primary-1">
                      <Plus />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {secondColumn.length > 0 ? (
          <div className="flex-1">
            <div className="flex items-end border-b border-b-gray-5 mb-2.5 py-2.5">
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
              {secondColumn.map((basket, index) => (
                <Card key={basket.basketId} className="group p-0">
                  <CardContent className="flex items-center p-0">
                    <div className="flex py-4 grow items-center min-h-19 group-hover:bg-black-4 rounded-lg">
                      <div className="px-4 flex-1 flex space-x-4">
                        <BasketStatus
                          className="size-7"
                          hasGift={Boolean(basket.gifts?.length)}
                          filled={Boolean(basket.sharePercent)}
                        />
                        <Typography variant="heading-3">{index + 6}</Typography>
                      </div>
                      <div className="px-4 flex-2">
                        <Typography variant="body-lg">{basket.sharePercent ?? 0}%</Typography>
                        {basket.shareAmount ? (
                          <Typography
                            variant="subtitle-md"
                            data-slot="share-amount"
                            className="text-gray-2 h-0 overflow-hidden transition-all transition-duration-300 group-hover:h-4"
                          >
                            = {basket.shareAmount} {basket.tokenName}
                          </Typography>
                        ) : null}
                      </div>
                      <div className="px-4 flex-7">
                        {basket.gifts ? (
                          <>
                            {basket.gifts.slice(0, 2).map((gift) => (
                              <Typography key={gift.name} variant="subtitle-md">
                                {gift.amount}X {gift.name}
                              </Typography>
                            ))}

                            {basket.gifts.length > 2 ? (
                              <Typography className="text-gray-2 underline" variant="subtitle-md">
                                + {basket.gifts.length - 2} more Asset
                              </Typography>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-0  flex items-center justify-center overflow-hidden transition-all transition-duration-300 group-hover:w-10">
                      <Button variant="plain" size="icon-xs" className="text-primary-1">
                        <Plus />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {/* {total > items.length ? (
        <Pagination
          page={pagination.page}
          perPage={pagination.perPage}
          onChangePerPage={(value) => setFilter('perPage', value.toString())}
          onChangePage={(value: number) => setFilter('page', value.toString())}
          total={total}
        />
      ) : null} */}
    </>
  );
};

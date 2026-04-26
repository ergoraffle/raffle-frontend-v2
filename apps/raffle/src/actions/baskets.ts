'use server';

import { getRaffleRaffleIdBasket, type GetRaffleRaffleIdBasketParams } from '@ergo-raffle/client';

export async function getRaffleBaskets(raffleId: string, params: GetRaffleRaffleIdBasketParams) {
  return await getRaffleRaffleIdBasket(raffleId, params);
}

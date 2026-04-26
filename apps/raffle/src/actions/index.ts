'use server';

import {
  getInfoBlockchain as getInfoBlockchainApi,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  type GetRaffleRaffleIdBasketParams
} from '@ergo-raffle/client';

export async function getRaffle(raffleId: string) {
  return await getRaffleRaffleId(raffleId);
}
export async function getRaffleBaskets(raffleId: string, params: GetRaffleRaffleIdBasketParams) {
  return await getRaffleRaffleIdBasket(raffleId, params);
}
export async function getInfoBlockchain() {
  return await getInfoBlockchainApi();
}

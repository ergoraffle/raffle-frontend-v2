'use server';

import {
  getInfoBlockchain as getInfoBlockchainApi,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  type GetRaffleRaffleIdBasketParams
} from '@ergo-raffle/client';

export const getRaffle = async (raffleId: string) => await getRaffleRaffleId(raffleId);
export const getRaffleBaskets = async (raffleId: string, params: GetRaffleRaffleIdBasketParams) =>
  await getRaffleRaffleIdBasket(raffleId, params);
export const getInfoBlockchain = async () => await getInfoBlockchainApi();

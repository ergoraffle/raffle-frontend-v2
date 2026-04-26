'use server';

import {
  type GetRaffleRaffleIdBasketParams,
  type GetTokensParams,
  getInfoBlockchain as getInfoBlockchainApi,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  getTokens as getTokensApi
} from '@ergo-raffle/client';

export const getRaffle = async (raffleId: string) => await getRaffleRaffleId(raffleId);
export const getRaffleBaskets = async (raffleId: string, params: GetRaffleRaffleIdBasketParams) =>
  await getRaffleRaffleIdBasket(raffleId, params);
export const getInfoBlockchain = async () => await getInfoBlockchainApi();
export const getTokens = async (params: GetTokensParams) => await getTokensApi(params);

'use server';

import {
  configureClient,
  getInfoBlockchain as getInfoBlockchainApi,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  getTokens as getTokensApi
} from '@ergo-raffle/client';

configureClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

export const getRaffle = getRaffleRaffleId;
export const getRaffleBaskets = getRaffleRaffleIdBasket;
export const getInfoBlockchain = getInfoBlockchainApi;
export const getTokens: typeof getTokensApi = async (params) => {
  if (!params.tokenIds?.length) return { items: [] };
  return await getTokensApi(params);
};

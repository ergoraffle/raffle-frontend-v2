'use server';

import {
  configureClient,
  getActivity as getActivityApi,
  getInfoBlockchain as getInfoBlockchainApi,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  getTokens as getTokensApi,
  getTokensSearch as getTokensSearchApi
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
export const getTokensSearch: typeof getTokensSearchApi = async (params) => {
  if (!params.query?.length || params.query.length < 3) return { items: [], total: 0 };
  return await getTokensSearchApi(params);
};
export const getActivity = getActivityApi;

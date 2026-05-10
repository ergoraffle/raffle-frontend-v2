'use server';

import {
  configureClient,
  getInfo as getInfoApi,
  getInfoBlockchain as getInfoBlockchainApi,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  getTokens as getTokensApi,
  getTokensBridgeable as getTokensBridgeableApi,
  postDonation as postDonationApi
} from '@ergo-raffle/client';
import Axios from 'axios';

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
export const getTokensBridgeable = getTokensBridgeableApi;
export const postDonation = postDonationApi;
export const getInfo = getInfoApi;

export const requestUnisat = async <T>(path: string): Promise<T> => {
  const headers = { 'Content-Type': 'application/json' };

  if (process.env.BITCOIN_UNISAT_API_KEY) {
    Object.assign(headers, {
      Authorization: `Bearer ${process.env.BITCOIN_UNISAT_API_KEY}`
    });
  }

  const response = await Axios.get<T>(`${process.env.BITCOIN_UNISAT_API}${path}`, { headers });

  return response.data;
};

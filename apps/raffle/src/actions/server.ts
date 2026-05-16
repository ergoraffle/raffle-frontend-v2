'use server';

import {
  getActivity,
  getInfo,
  getInfoBlockchain,
  getRaffleRaffleId,
  getRaffleRaffleIdBasket,
  getTokens,
  getTokensBridgeable,
  getTokensSearch,
  postApiDonation
} from '@ergo-raffle/client';
import Axios from 'axios';

import { wrap } from '@/safeServerAction';

const getTokensBase: typeof getTokens = async (params) => {
  if (!params.tokenIds?.length) return { items: [] };
  return await getTokens(params);
};

const getTokensSearchBase: typeof getTokensSearch = async (params) => {
  if (!params.query?.length || params.query.length < 3) return { items: [], total: 0 };
  return await getTokensSearch(params);
};

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

export const getRaffleSafe = wrap(getRaffleRaffleId, 'getRaffleRaffleId');
export const getRaffleBasketsSafe = wrap(getRaffleRaffleIdBasket, 'getRaffleRaffleIdBasket');
export const getInfoBlockchainSafe = wrap(getInfoBlockchain, 'getInfoBlockchain');
export const getActivitySafe = wrap(getActivity, 'getActivity');
export const getTokensBridgeableSafe = wrap(getTokensBridgeable, 'getTokensBridgeable');
export const postDonationSafe = wrap(postApiDonation, 'postDonation');
export const getInfoSafe = wrap(getInfo, 'getInfo');
export const getTokensSafe = wrap(getTokensBase, 'getTokensBase');
export const getTokensSearchSafe = wrap(getTokensSearchBase, 'getTokensSearchBase');

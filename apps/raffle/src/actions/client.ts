'use client';

import { unwrap } from '@/safeServerAction';

import {
  getActivitySafe,
  getInfoBlockchainSafe,
  getInfoSafe,
  getRaffleBasketsSafe,
  getRaffleSafe,
  getTokensBridgeableSafe,
  getTokensSafe,
  getTokensSearchSafe,
  postDonationSafe,
  requestUnisatSafe
} from './server';

export const getRaffle = unwrap(getRaffleSafe);
export const getRaffleBaskets = unwrap(getRaffleBasketsSafe);
export const getInfoBlockchain = unwrap(getInfoBlockchainSafe);
export const getActivity = unwrap(getActivitySafe);
export const getTokensBridgeable = unwrap(getTokensBridgeableSafe);
export const postDonation = unwrap(postDonationSafe);
export const getInfo = unwrap(getInfoSafe);
export const getTokens = unwrap(getTokensSafe);
export const getTokensSearch = unwrap(getTokensSearchSafe);
export const requestUnisat = unwrap(requestUnisatSafe) as <T>(path: string) => Promise<T>;

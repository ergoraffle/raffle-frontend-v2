'use client';

import { getRaffleWinnerBasketTransactions } from '@/actions';
import { createServerHook } from '@/lib';

export const useFetchWinnerBasketTransactions = createServerHook(getRaffleWinnerBasketTransactions);

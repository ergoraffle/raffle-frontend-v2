'use client';

import { getRaffleBaskets } from '@/actions';
import { createServerHook } from '@/lib';

export const useFetchWinnerBaskets = createServerHook(getRaffleBaskets);

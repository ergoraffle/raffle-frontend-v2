'use client';

import { getTokensSearch } from '@/actions';
import { createServerHook } from '@/lib';

export const useFetchTokensSearch = createServerHook(getTokensSearch);

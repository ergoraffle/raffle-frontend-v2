'use client';

import { getTokens } from '@/actions';
import { createServerHook } from '@/lib';

export const useFetchTokens = createServerHook(getTokens);

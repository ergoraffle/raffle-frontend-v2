'use client';

import { getInfoBlockchain } from '@/actions';
import { createServerHook } from '@/lib';

export const useInfoBlockchain = createServerHook(getInfoBlockchain);

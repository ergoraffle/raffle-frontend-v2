'use client';

import { getActivity } from '@/actions';
import { createServerHook } from '@/lib';

export const useFetchActivity = createServerHook(getActivity);

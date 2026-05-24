'use client';

import { getTags } from '@/actions';
import { createServerHook } from '@/lib';

export const useFetchTags = createServerHook(getTags);

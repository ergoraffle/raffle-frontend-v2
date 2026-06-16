'use client';

import { getSocial } from '@/actions';
import { createServerHook } from '@/lib';

/**
 * Client hook that fetches the social (X.com) posts for a raffle from our API.
 *
 * Mirrors the other read hooks (e.g. `useFetchActivity`) by wrapping the
 * `getSocial` server action through `createServerHook`, which manages the
 * `{ data, error, isLoading }` lifecycle. The hook is called with the same
 * arguments as the underlying client method: `(raffleId, params)`.
 */
export const useFetchSocial = createServerHook(getSocial);

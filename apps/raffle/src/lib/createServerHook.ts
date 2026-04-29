'use client';

import { useEffect, useState, useTransition } from 'react';

// biome-ignore lint/suspicious/noExplicitAny: make it better
export const createServerHook = <T, A extends any[]>(action: (...args: A) => Promise<T>) => {
  return (...args: A) => {
    const [data, setData] = useState<T | null>(null);

    const [error, setError] = useState<unknown>(null);

    const [isLoading, startTransition] = useTransition();

    // biome-ignore lint/correctness/useExhaustiveDependencies: make it better
    useEffect(() => {
      let mounted = true;

      startTransition(async () => {
        try {
          const res = await action(...args);
          if (mounted) setData(res);
        } catch (e) {
          if (mounted) setError(e);
        }
      });

      return () => {
        mounted = false;
      };
    }, [action, ...args]);

    return { data, error, isLoading };
  };
};

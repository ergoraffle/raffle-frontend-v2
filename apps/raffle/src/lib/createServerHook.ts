'use client';

import { useEffect, useRef, useState } from 'react';

type ServerHookResult<T> = {
  data: T | null;
  error: unknown;
  isLoading: boolean;
};

export const createServerHook =
  <T, A extends readonly unknown[]>(action: (...args: A) => Promise<T>) =>
  (...args: A): ServerHookResult<T> => {
    const [data, setData] = useState<T | null>(null);

    const [error, setError] = useState<unknown>(null);

    const [isLoading, setIsLoading] = useState(false);

    const argsKeyRef = useRef<string>('');

    // biome-ignore lint/correctness/useExhaustiveDependencies: make it better
    useEffect(() => {
      const key = JSON.stringify(args);

      if (argsKeyRef.current === key) {
        return;
      }

      argsKeyRef.current = key;

      setIsLoading(true);

      action(...args)
        .then((res) => {
          setData(res);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, [action, ...args]);

    return {
      data,
      error,
      isLoading
    };
  };

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export const useRafflesFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (key: string, value?: string | string[]) => {
    const params = new URLSearchParams(searchParams);

    if (Array.isArray(value)) {
      params.delete(key);
      value.forEach((v) => {
        params.append(key, v);
      });
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return { setFilter };
};

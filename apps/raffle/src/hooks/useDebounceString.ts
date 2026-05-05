'use client';

import { useEffect, useState } from 'react';

export const useDebounceString = (value: string): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return debouncedValue;
};

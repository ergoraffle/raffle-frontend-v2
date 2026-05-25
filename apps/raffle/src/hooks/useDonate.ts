import { useContext } from 'react';

import { DonateContext } from '@/providers/DonateProvider';

export const useDonate = () => {
  const context = useContext(DonateContext);

  if (!context) {
    throw new Error('useDonate must be used within DonateProvider');
  }

  return context;
};

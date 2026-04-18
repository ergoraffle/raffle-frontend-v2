'use server';

import { validateAddress as validate } from '@rosen-bridge/address-codec';

export const validateAddress = async (chain: 'ergo', address: string) => {
  validate(chain, address);
};

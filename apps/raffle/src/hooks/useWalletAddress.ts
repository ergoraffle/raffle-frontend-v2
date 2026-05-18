import { useEffect, useState } from 'react';

import { useWallet } from './useWallet';

export const useWalletAddress = () => {
  const [address, setAddress] = useState<string>();
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connecting && wallet.selected) {
      wallet.selected.getAddresses().then((addresses) => {
        const walletAddress =
          'main' in addresses
            ? addresses.main
            : 'nativeSegWit' in addresses
              ? addresses.nativeSegWit
              : undefined;
        setAddress(walletAddress);
      });
    }
  }, [wallet.selected, wallet.connecting]);

  return address;
};

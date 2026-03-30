import type { WalletConfig } from '@ergo-raffle/base-wallet';

export type XverseWalletConfig = WalletConfig & {};

export type XverseWalletAddresses = {
  nativeSegWit: string;
  taproot: string;
  taprootPublicKey: string;
};

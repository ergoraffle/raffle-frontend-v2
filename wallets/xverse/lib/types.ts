import { type WalletConfig, WalletError } from '@ergo-raffle/base-wallet';

export type XverseWalletConfig = WalletConfig & {};

export type XverseWalletAddresses = {
  nativeSegWit: string;
  taproot: string;
  taprootPublicKey: string;
};

export type XverseWalletTransferParams = {
  amount: bigint;
  fromAddress: string;
  toAddress: string;
  token?: {
    id: string;
    amount: bigint;
  };
};

export class NonNativeSegWitAddressError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(
      `The source address of the selected [${wallet}] wallet is not native SegWit (P2WPKH or P2WSH).`,
      {
        cause
      }
    );
  }
}

export class NonTaprootAddressError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`The source address of the selected [${wallet}] wallet is not Taproot.`, {
      cause
    });
  }
}

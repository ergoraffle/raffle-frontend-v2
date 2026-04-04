import { ConnectionTimeoutError, Wallet } from '@ergo-raffle/base-wallet';

import { ICON } from './icon';
import type { NautilusWalletAddresses, NautilusWalletConfig } from './types';

export class NautilusWallet extends Wallet<NautilusWalletConfig, NautilusWalletAddresses> {
  icon = ICON;

  name = 'Nautilus' as const;

  label = 'Nautilus';

  link = 'https://github.com/nautls/nautilus-wallet';

  private get api() {
    return window.ergoConnector.nautilus;
  }

  performConnect = async (): Promise<void> => {
    let isConnected: boolean;

    try {
      isConnected = await this.api.connect({ createErgoObject: false });
    } catch (error) {
      throw new ConnectionTimeoutError(this.name, error);
    }

    if (isConnected) return;

    throw new Error();
  };

  performDisconnect = async (): Promise<void> => {
    const result = await this.api.disconnect();

    if (result) return;

    throw new Error();
  };

  fetchAddresses = async (): Promise<NautilusWalletAddresses | undefined> => {
    const wallet = await this.api.getContext();

    const address = await wallet.get_change_address();

    if (!address) return;

    return {
      main: address
    };
  };

  isAvailable = (): boolean =>
    typeof window.ergoConnector !== 'undefined' && !!window.ergoConnector.nautilus;

  hasConnection = async (): Promise<boolean> => await this.api.isAuthorized();
}

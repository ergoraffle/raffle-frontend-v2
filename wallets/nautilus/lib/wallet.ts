import {
  ConnectionTimeoutError,
  SubmitTransactionError,
  UserDeniedTransactionSignatureError,
  Wallet,
  type WalletToken
} from '@ergo-raffle/base-wallet';

import { ICON } from './icon';
import type {
  ErgoBoxProxy,
  ErgoTxProxy,
  NautilusWalletAddresses,
  NautilusWalletConfig,
  UnsignedErgoTxProxy
} from './types';

const ERG_TOKEN: WalletToken = {
  id: 'ERG',
  name: 'Erg',
  decimals: 9
};

export class NautilusWallet extends Wallet<
  NautilusWalletConfig,
  NautilusWalletAddresses,
  ErgoBoxProxy,
  UnsignedErgoTxProxy
> {
  icon = ICON;

  name = 'Nautilus' as const;

  label = 'Nautilus';

  link = 'https://github.com/nautls/nautilus-wallet';

  private get api() {
    return window.ergoConnector.nautilus;
  }

  private get tokens(): WalletToken[] {
    return JSON.parse(localStorage.getItem(`Wallet:${this.name}`) || '[]');
  }

  private set tokens(value: WalletToken[]) {
    localStorage.setItem(`Wallet:${this.name}`, JSON.stringify(value));
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

  fetchTokens = async (): Promise<WalletToken[]> => {
    const cachedTokens = this.tokens;

    const wallet = await this.api.getContext();

    const balances = await wallet.get_balance('all');

    const ids = balances.map((balance) => balance.tokenId);

    const idsToFetch = ids.filter(
      (id) => id !== ERG_TOKEN.id && !cachedTokens.some((token) => token.id === id)
    );

    const responses = await Promise.allSettled(
      idsToFetch.map((id) =>
        fetch(`${this.config.explorerApi}/tokens/${id}`).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.json();
        })
      )
    );

    const fulfilled = responses.filter((response) => response.status === 'fulfilled');

    const failedCount = responses.length - fulfilled.length;

    const parsedTokens = fulfilled.map<WalletToken>((response) => ({
      id: response.value.id,
      name: response.value.name ?? '',
      decimals: response.value.decimals ?? -1
    }));

    const hasErg = cachedTokens.some((token) => token.id === ERG_TOKEN.id);

    const mergedTokens = [
      ...(hasErg ? [] : [ERG_TOKEN]),
      ...cachedTokens,
      ...parsedTokens.filter((newToken) => !cachedTokens.some((token) => token.id === newToken.id))
    ];

    this.tokens = mergedTokens;

    if (failedCount > 0) {
      throw new Error(`[${this.name}] Failed to fetch ${failedCount} token(s) from Ergo API.`);
    }

    return mergedTokens.filter((token) => ids.includes(token.id));
  };

  fetchBoxes = async (): Promise<ErgoBoxProxy[]> => {
    const wallet = await this.api.getContext();

    const boxes = await wallet.get_utxos();

    return boxes || [];
  };

  performTransfer = async (unsignedTx: UnsignedErgoTxProxy): Promise<string> => {
    const wallet = await this.api.getContext();

    let signedTx: ErgoTxProxy;

    try {
      signedTx = await wallet.sign_tx(unsignedTx);
    } catch (error) {
      throw new UserDeniedTransactionSignatureError(this.name, error);
    }
    try {
      return await wallet.submit_tx(signedTx);
    } catch (error) {
      throw new SubmitTransactionError(this.name, error);
    }
  };

  fetchBalance = async (tokenId: string): Promise<string> => {
    const wallet = await this.api.getContext();

    const amount = await wallet.get_balance(tokenId === 'erg' ? 'ERG' : tokenId);

    return amount;
  };
}

import {
  NonNativeSegWitAddressError,
  NonTaprootAddressError,
  Wallet
} from '@ergo-raffle/base-wallet';
import { AddressPurpose, request } from 'sats-connect';

import { ICON } from './icon';
import type { XverseWalletConfig } from './types';

export class XverseWallet extends Wallet<XverseWalletConfig> {
  icon = ICON;

  name = 'Xverse' as const;;

  label = 'Xverse';

  link = 'https://www.xverse.app/';

  performConnect = async (): Promise<void> => {
    const response = await request('wallet_connect', null);

    if (response.status === 'success') return;

    throw response.error;
  };

  performDisconnect = async (): Promise<void> => {
    const response = await request('wallet_disconnect', null);

    if (response.status === 'success') return;

    throw response.error;
  };

  fetchAddresses = async (): Promise<string[] | undefined> => {
    const response = await request('getAddresses', {
      purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment]
    });

    if (response.status === 'error') throw response.error;

    const taprootAddress = response.result.addresses.find(
      (address) => address.purpose === AddressPurpose.Ordinals
    );

    const isNonTaproot =
      !taprootAddress || !taprootAddress.address.toLowerCase().startsWith('bc1p');

    if (isNonTaproot) {
      throw new NonTaprootAddressError(this.name);
    }

    const nativeSegWitAddress = response.result.addresses.find(
      (address) => address.purpose === AddressPurpose.Payment
    );

    const isNonNativeSegWit =
      !nativeSegWitAddress || !nativeSegWitAddress.address.toLowerCase().startsWith('bc1q');

    if (isNonNativeSegWit) {
      throw new NonNativeSegWitAddressError(this.name);
    }

    return [taprootAddress.address, nativeSegWitAddress.address];
  };

  isAvailable = (): boolean =>
    typeof window !== 'undefined' && !!window.XverseProviders?.BitcoinProvider;

  hasConnection = async (): Promise<boolean> => {
    const response = await request('getAddresses', {
      purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment]
    });
    return response.status === 'success';
  };
}

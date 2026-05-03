import {
  SubmitTransactionError,
  UserDeniedTransactionSignatureError,
  Wallet,
  type WalletToken
} from '@ergo-raffle/base-wallet';
import { BitcoinBoxSelection, generateFeeEstimator } from '@rosen-bridge/bitcoin-utxo-selection';
import { address, Psbt } from 'bitcoinjs-lib';
import { AddressPurpose, request } from 'sats-connect';

import { ICON } from './icon';
import {
  NonNativeSegWitAddressError,
  NonTaprootAddressError,
  type XverseWalletAddresses,
  type XverseWalletConfig,
  type XverseWalletTransferParams
} from './types';

const selector = new BitcoinBoxSelection();

export class XverseWallet extends Wallet<
  XverseWalletConfig,
  XverseWalletAddresses,
  unknown,
  XverseWalletTransferParams
> {
  icon = ICON;

  name = 'Xverse' as const;

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

  fetchAddresses = async (): Promise<XverseWalletAddresses | undefined> => {
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

    return {
      nativeSegWit: nativeSegWitAddress.address,
      taproot: taprootAddress.address,
      taprootPublicKey: taprootAddress.publicKey
    };
  };

  isAvailable = (): boolean =>
    typeof window !== 'undefined' && !!window.XverseProviders?.BitcoinProvider;

  hasConnection = async (): Promise<boolean> => {
    const response = await request('getAddresses', {
      purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment]
    });
    return response.status === 'success';
  };

  fetchTokens = async (): Promise<WalletToken[]> => [];

  fetchBoxes = async (): Promise<unknown[]> => [];

  performTransfer = async (params: XverseWalletTransferParams): Promise<string> => {
    const fromAddressScript = address.toOutputScript(params.fromAddress);
    const toAddressScript = address.toOutputScript(params.toAddress);

    const psbt = new Psbt();

    psbt.addOutput({
      script: toAddressScript,
      value: params.amount
    });

    const utxosRaw: Array<{ txid: string; vout: number; value: number }> = await fetch(
      `https://blockstream.info/api/address/${params.fromAddress}/utxo`
    ).then((response) => response.json());

    const utxos = utxosRaw.map((utxo) => ({
      txId: utxo.txid,
      index: utxo.vout,
      value: BigInt(utxo.value)
    }));

    const feeRatio = await fetch(`https://blockstream.info/api/fee-estimates`)
      .then((response) => response.json())
      .then((data) => data[6]);

    const estimateFee = generateFeeEstimator(1, 42, 272, 124, feeRatio, 4);

    const coveredBoxes = await selector.getCoveringBoxes(
      {
        nativeToken: params.amount,
        tokens: []
      },
      [],
      new Map(),
      utxos.values(),
      546n, // minSatoshi
      undefined,
      estimateFee
    );

    if (!coveredBoxes.covered) {
      coveredBoxes.uncoveredAssets;
    }

    coveredBoxes.boxes.forEach((box) => {
      psbt.addInput({
        hash: box.txId,
        index: box.index,
        witnessUtxo: {
          script: fromAddressScript,
          value: box.value
        }
      });
    });

    psbt.addOutput({
      script: fromAddressScript,
      value: coveredBoxes.additionalAssets.aggregated.nativeToken
    });

    let signedPsbtBase64: string;

    try {
      const response = await request('signPsbt', {
        psbt: psbt.toBase64(),
        signInputs: {
          [params.fromAddress]: Array.from(Array(psbt.inputCount).keys())
        }
      });

      if (response.status === 'error') {
        throw response.error;
      }

      signedPsbtBase64 = response.result.psbt;
    } catch (error) {
      throw new UserDeniedTransactionSignatureError(this.name, error);
    }

    try {
      const psbt = Psbt.fromBase64(signedPsbtBase64);

      psbt.finalizeAllInputs();

      const data = await fetch(`https://blockstream.info/api/tx`, {
        method: 'POST',
        body: psbt.extractTransaction().toHex()
      }).then((response) => response.text());

      return data;
    } catch (error) {
      throw new SubmitTransactionError(this.name, error);
    }
  };

  fetchBalance = async () => undefined;
}

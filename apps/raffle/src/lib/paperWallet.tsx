'use client';

import { ErgoAddress } from '@fleet-sdk/core';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';

const defaultStrength = 160;
const derivationPath = "m/44'/429'/0'/0";

export const paperWallet = async () => {
  const mnemonic = bip39.generateMnemonic(defaultStrength);

  const buffer = await bip39.mnemonicToSeed(mnemonic);

  const mnemonicString = mnemonic.toString();

  const change = bip32.fromSeed(buffer).derivePath(derivationPath);
  const index = change.derive(0);
  const address = ErgoAddress.fromPublicKey(index.publicKey.toString('hex')).toString();

  const blob = new Blob([`Mnemonic\n${mnemonicString}\n\nAddress\n${address}`], {
    type: 'text/plain'
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mnemonic.txt';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(link.href);

  return address;
};

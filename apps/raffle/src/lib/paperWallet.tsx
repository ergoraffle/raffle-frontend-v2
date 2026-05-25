'use client';

import { Address } from '@coinbarn/ergo-ts';
import { type WalletChecksum, walletChecksum } from '@emurgo/cip4-js';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as bs58check from 'bs58check';

const defaultStrength = 160;
const derivationPath = "m/44'/429'/0'/0";

class Seed {
  private _change!: bip32.BIP32Interface;
  private _index!: bip32.BIP32Interface;

  private _pk!: Buffer;

  constructor(buffer: Buffer) {
    this._change = bip32.fromSeed(buffer).derivePath(derivationPath);
    this._index = this._change.derive(0);
  }

  public get address(): string {
    return Address.fromPk(this._index.publicKey.toString('hex')).address;
  }

  public get currentBip32(): bip32.BIP32Interface {
    return this._index;
  }

  public get extendedPublicKey(): string {
    if (!this._pk) {
      this._pk = bs58check.decode(this._change.neutered().toBase58());
    }
    return this._pk.toString('hex');
  }

  public get checksum(): WalletChecksum {
    // The parent fingerprint and index fields need to be
    // removed to get the same result as Yoroi.
    const pk = this.removeParentFingerprintAndIndex(Buffer.from(this._pk));
    return walletChecksum(pk.toString('hex'));
  }

  private removeParentFingerprintAndIndex(key: Buffer) {
    return key.fill(0, 4, 12);
  }

  public derive(index: number): Seed {
    this._index = this._change.derive(index);
    return this;
  }
}

export const paperWallet = async () => {
  const mnemonic = bip39.generateMnemonic(defaultStrength);

  const buffer = await bip39.mnemonicToSeed(mnemonic);

  const seed = new Seed(buffer);

  const mnemonicString = mnemonic.toString();

  const address = seed.derive(0).address;

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

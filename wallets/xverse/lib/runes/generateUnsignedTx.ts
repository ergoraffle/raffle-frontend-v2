import type { Psbt } from 'bitcoinjs-lib';

export const generateUnsignedTx = async (
  _amount: bigint,
  _fromAddress: string,
  _toAddress: string,
  _tokenId: string,
  _tokenAmount: bigint
): Promise<{ psbt: Psbt; signInputs: Record<string, number[]> }> => {
  throw new Error();
};

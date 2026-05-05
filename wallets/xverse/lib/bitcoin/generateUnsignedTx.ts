import { InsufficientAssetsError } from '@ergo-raffle/base-wallet';
import { BitcoinBoxSelection, generateFeeEstimator } from '@rosen-bridge/bitcoin-utxo-selection';
import { address, Psbt } from 'bitcoinjs-lib';

const selector = new BitcoinBoxSelection();

export const generateUnsignedTx = async (
  amount: bigint,
  fromAddress: string,
  toAddress: string
): Promise<{ psbt: Psbt; signInputs: Record<string, number[]> }> => {
  const fromAddressScript = address.toOutputScript(fromAddress);
  const toAddressScript = address.toOutputScript(toAddress);

  const psbt = new Psbt();

  psbt.addOutput({
    script: toAddressScript,
    value: amount
  });

  const utxosRaw: Array<{ txid: string; vout: number; value: number }> = await fetch(
    `https://blockstream.info/api/address/${fromAddress}/utxo`
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
      nativeToken: amount,
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
    throw new InsufficientAssetsError();
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

  return {
    psbt,
    signInputs: {
      [fromAddress]: Array.from(Array(psbt.inputCount).keys())
    }
  };
};

import type { WalletConfig } from '@ergo-raffle/base-wallet';

export type NautilusWalletConfig = WalletConfig & {
  explorerApi: string;
};

export type NautilusWalletAddresses = {
  main: string;
};

declare global {
  interface Window {
    ergoConnector: {
      nautilus: {
        disconnect: () => Promise<boolean>;
        connect: (params: { createErgoObject: boolean }) => Promise<boolean>;
        getContext: () => Promise<EipWalletApi>;
        isAuthorized: () => Promise<boolean>;
      };
    };
  }
}

type BoxId = HexString;
type TxId = HexString;
type HexString = string;
type TokenId = HexString;
type NErg = bigint;
type Base58String = string;
type Address = Base58String;
type Paging = {
  offset: number;
  limit: number;
};

export type ErgoBoxProxy = {
  readonly boxId: BoxId;
  readonly transactionId: TxId;
  readonly index: number;
  readonly ergoTree: ErgoTree;
  readonly creationHeight: number;
  readonly value: string;
  readonly assets: TokenAmountProxy[];
  readonly additionalRegisters: Registers;
};

declare type ErgoBoxCandidateProxy = {
  readonly value: string;
  readonly ergoTree: ErgoTree;
  readonly creationHeight: number;
  readonly assets: TokenAmountProxy[];
  readonly additionalRegisters: Registers;
};

type ErgoTree = HexString;

export type ErgoTxProxy = {
  readonly id: TxId;
  readonly inputs: Input[];
  readonly dataInputs: DataInput[];
  readonly outputs: ErgoBoxProxy[];
  readonly size: number;
};

type Input = {
  readonly boxId: BoxId;
  readonly spendingProof: ProverResult;
};

type DataInput = {
  readonly boxId: BoxId;
};

type ContextExtension = {
  [key: string]: HexString;
};

type ProverResult = {
  readonly proof: Uint8Array;
  readonly extension: ContextExtension;
};

type Registers = {
  [key: string]: HexString;
};

type TokenAmountProxy = {
  readonly tokenId: TokenId;
  readonly amount: string;
  readonly name?: string;
  readonly decimals?: number;
};

type UnsignedInputProxy = {
  readonly boxId: BoxId;
  readonly transactionId: TxId;
  readonly index: number;
  readonly ergoTree: ErgoTree;
  readonly creationHeight: number;
  readonly value: string;
  readonly assets: TokenAmountProxy[];
  readonly additionalRegisters: Registers;
  readonly extension: ContextExtension;
};

export type UnsignedErgoTxProxy = {
  readonly inputs: UnsignedInputProxy[];
  readonly dataInputs: DataInput[];
  readonly outputs: ErgoBoxCandidateProxy[];
};

interface EipWalletApi {
  request_read_access: () => Promise<boolean>;

  check_read_access: () => boolean;

  get_utxos: (
    amount?: NErg,
    token_id?: TokenId,
    paginate?: Paging
  ) => Promise<ErgoBoxProxy[] | undefined>;

  get_balance: (token_id: TokenId) => Promise<Array<{ balance: string; tokenId: string }>>;

  get_used_addresses: (paginate?: Paging) => Promise<Address[]>;

  get_change_address: () => Promise<Address>;

  get_unused_addresses: () => Promise<Address[]>;

  sign_tx: (tx: UnsignedErgoTxProxy) => Promise<ErgoTxProxy>;

  sign_tx_input: (tx: UnsignedErgoTxProxy, index: number) => Promise<Input>;

  sign_data: (addr: Address, message: string) => Promise<string>;

  submit_tx: (tx: ErgoTxProxy) => Promise<TxId>;

  add_external_box: (box_id: BoxId) => boolean;
}

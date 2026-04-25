import {
  AddressRetrievalError,
  BalanceFetchError,
  ConnectionRejectedError,
  DisconnectionFailedError,
  NotConnectedError,
  UnavailableApiError,
  UtxoFetchError,
  WalletError
} from './errors';
import type { WalletToken } from './types';

// biome-ignore lint/complexity/noBannedTypes: in feuture we will have more config options
export type WalletConfig = {};

export abstract class Wallet<
  Config extends WalletConfig = WalletConfig,
  Addresses extends Record<string, string> = Record<string, string>,
  Box = unknown,
  WalletTransferParams = unknown
> {
  abstract icon: string;
  abstract name: string;
  abstract label: string;
  abstract link: string;

  constructor(protected config: Config) {}

  abstract performConnect: () => Promise<void>;
  abstract performDisconnect: () => Promise<void>;
  abstract fetchAddresses: () => Promise<Addresses | undefined>;
  abstract isAvailable: () => boolean;
  abstract hasConnection: () => Promise<boolean>;
  abstract fetchTokens: () => Promise<WalletToken[]>;
  abstract fetchBoxes: () => Promise<Box[]>;
  abstract performTransfer: (params: WalletTransferParams) => Promise<string>;
  abstract fetchBalance: (
    tokenId: string,
  ) => Promise<bigint | number | string | undefined>;

  isConnected = async (): Promise<boolean> => {
    this.requireAvailable();
    try {
      return await this.hasConnection();
    } catch {
      return false;
    }
  };

  connect = async (): Promise<void> => {
    this.requireAvailable();

    try {
      await this.performConnect();
    } catch (error) {
      throw new ConnectionRejectedError(this.name, error);
    }
  };

  disconnect = async (): Promise<void> => {
    this.requireAvailable();

    try {
      await this.performDisconnect();
    } catch (error) {
      throw new DisconnectionFailedError(this.name, error);
    }
  };

  getAddresses = async (): Promise<Addresses> => {
    this.requireAvailable();

    await this.requireConnection();

    try {
      const addresses = await this.fetchAddresses();

      if (!addresses || !Object.keys(addresses).length) throw addresses;

      return addresses;
    } catch (error) {
      if (error instanceof WalletError) {
        throw error;
      }
      throw new AddressRetrievalError(this.name, error);
    }
  };

  getBoxes = async (): Promise<Box[]> => {
    this.requireAvailable();

    await this.requireConnection();

    try {
      return await this.fetchBoxes();
    } catch (error) {
      throw new UtxoFetchError(this.name, error);
    }
  };

  transfer = async (params: WalletTransferParams): Promise<string> => {
    this.requireAvailable();

    await this.requireConnection();

    return await this.performTransfer(params);
  };

  getBalance = async (tokenId: string): Promise<bigint> => {
    this.requireAvailable();

    await this.requireConnection();

    let raw: bigint | number | string | undefined;

    try {
      raw = await this.fetchBalance(tokenId);
    } catch (error) {
      throw new BalanceFetchError(this.name, error);
    }

    if (!raw) return 0n;

    const amount = BigInt(raw);

    if (!amount) return 0n;

    return amount;
  };

  protected requireAvailable = () => {
    if (this.isAvailable()) return;
    throw new UnavailableApiError(this.name);
  };

  protected requireConnection = async () => {
    if (await this.isConnected()) return;
    throw new NotConnectedError(this.name);
  };
}

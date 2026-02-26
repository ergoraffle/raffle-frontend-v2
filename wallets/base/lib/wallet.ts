import {
  AddressRetrievalError,
  ConnectionRejectedError,
  DisconnectionFailedError,
  NotConnectedError,
  UnavailableApiError,
  WalletError
} from './errors';

// biome-ignore lint/complexity/noBannedTypes: in feuture we will have more config options
export type WalletConfig = {};

export abstract class Wallet<Config extends WalletConfig = WalletConfig> {
  abstract icon: string;
  abstract name: string;
  abstract label: string;
  abstract link: string;

  constructor(protected config: Config) {}

  abstract performConnect: () => Promise<void>;
  abstract performDisconnect: () => Promise<void>;
  abstract fetchAddresses: () => Promise<string[] | undefined>;
  abstract isAvailable: () => boolean;
  abstract hasConnection: () => Promise<boolean>;

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

  getAddresses = async (): Promise<string[]> => {
    this.requireAvailable();

    await this.requireConnection();

    try {
      const addresses = await this.fetchAddresses();

      if (!addresses || !addresses.length) throw addresses;

      return addresses;
    } catch (error) {
      if (error instanceof WalletError) {
        throw error;
      }
      throw new AddressRetrievalError(this.name, error);
    }
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

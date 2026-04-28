export class WalletError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WalletError);
    }

    this.name = new.target.name;
  }
}

export class AddressRetrievalError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`Failed to retrieve the address from the [${wallet}] wallet`, {
      cause
    });
  }
}

export class BalanceFetchError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`Failed to fetch wallet balance from the [${wallet}] wallet`, {
      cause
    });
  }
}

export class ConnectionRejectedError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`User rejected the connection request for the [${wallet}] wallet`, {
      cause
    });
  }
}

export class ConnectionTimeoutError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(
      `The wallet [${wallet}] extension has timed out, and the user has neither confirmed nor rejected it`,
      {
        cause
      }
    );
  }
}

export class DisconnectionFailedError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`An error occurred while disconnecting from the [${wallet}] wallet`, {
      cause
    });
  }
}

export class NotConnectedError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`Wallet connection required for the [${wallet}] wallet`, {
      cause
    });
  }
}

export class SubmitTransactionError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`Transaction failed for the [${wallet}] wallet`, {
      cause
    });
  }
}

export class UnavailableApiError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`The [${wallet}] wallet API is not available.`, {
      cause
    });
  }
}

export class UserDeniedTransactionSignatureError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`Transaction signature denied by the user for the [${wallet}] wallet`, {
      cause
    });
  }
}

export class UtxoFetchError extends WalletError {
  constructor(
    public wallet: string,
    public cause?: unknown
  ) {
    super(`Failed to fetch wallet UTXOs from the [${wallet}] wallet`, {
      cause
    });
  }
}

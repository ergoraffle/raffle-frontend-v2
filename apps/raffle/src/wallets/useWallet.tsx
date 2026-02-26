import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import type { Wallet } from '@ergo-raffle/base-wallet';
import { Wallet as WalletIcon } from '@ergo-raffle/icons';
import { Button, Dialog, DialogClose, DialogContent } from '@ergo-raffle/ui-kit';

import * as wallets from '@/wallets';

type WalletContextValue = {
  addresses?: string[];
  wallets: Wallet[];
  selected?: Wallet;
  connecting?: string;
  agreement?: boolean;
  error?: unknown;
  select: (name?: string) => void;
  deselect: () => void;
  disconnect: () => void;
  setAgreement: (value: boolean) => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }

  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<string[]>();
  const [error, setError] = useState<unknown>();
  const [connecting, setConnecting] = useState<string>();
  const [agreement, setAgreement] = useState<boolean>();
  const [selected, setSelected] = useState<Wallet>();

  const select = useCallback((name?: string) => {
    setSelected(undefined);

    const wallet = Object.values(wallets).find((wallet) => wallet.name === name);

    if (!wallet) return;

    setConnecting(name);

    wallet
      .connect()
      .then(async () => {
        const addresses = await wallet.getAddresses();

        setAddresses(addresses);

        setSelected(wallet);

        localStorage.setItem('raffle:wallet', wallet.name);
      })
      .catch(setError)
      .finally(() => setConnecting(undefined));
  }, []);

  const deselect = useCallback(() => {
    setConnecting(undefined);
    setSelected(undefined);
  }, []);

  const disconnect = useCallback(() => {
    if (!selected) return;

    selected
      .disconnect()
      .then(() => {
        setSelected(undefined);
        localStorage.removeItem('raffle:wallet');
      })
      .catch(setError);
  }, [selected]);

  useEffect(() => {
    (async () => {
      const name = localStorage.getItem('raffle:wallet');

      const wallet = Object.values(wallets).find((wallet) => wallet.name === name);

      if (!wallet) return;

      if (!wallet.isAvailable()) return;

      setConnecting(wallet.name);

      if (!(await wallet.isConnected())) {
        setConnecting(undefined);

        return;
      }

      try {
        await wallet.connect();

        const addresses = await wallet.getAddresses();

        setAddresses(addresses);

        setSelected(wallet);

        setAgreement(true);
      } catch {
        //
      }

      setConnecting(undefined);
    })();
  }, []);

  const value = useMemo(
    () => ({
      addresses,
      agreement,
      connecting,
      error,
      selected,
      wallets: Object.values(wallets),
      deselect,
      disconnect,
      select,
      setAgreement
    }),
    [addresses, agreement, connecting, error, selected, deselect, disconnect, select]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const WalletButton = () => {
  const wallet = useWallet();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!wallet.error) return;

    // biome-ignore lint/suspicious/noAlert: will remove
    alert(wallet.error);

    setOpen(false);
  }, [wallet.error]);

  useEffect(() => {
    if (!wallet.connecting && !!wallet.selected) {
      setOpen(false);
    }
  }, [wallet.connecting, wallet.selected]);

  return (
    <>
      <Button disabled={!!wallet.connecting} variant="outline-soft" onClick={() => setOpen(true)}>
        <WalletIcon className="hidden lg:inline-flex" />
        {!!wallet.connecting && <div>connecting...</div>}
        {!wallet.connecting && !!wallet.selected && <div>{wallet.addresses?.join(', ')}</div>}
        {!wallet.connecting && !wallet.selected && (
          <>
            <span className="hidden lg:inline-flex">Connect Wallet</span>
            <span className="lg:hidden">Set Wallet</span>
          </>
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogClose />
        <DialogContent>
          {!!wallet.selected && (
            <button type="button" onClick={() => wallet.deselect()}>
              Back
            </button>
          )}
          {!wallet.agreement && (
            <>
              Agreement
              <button type="button" onClick={() => wallet.setAgreement(true)}>
                Click
              </button>
            </>
          )}
          {!!wallet.agreement && !wallet.selected && (
            <>
              Connect Wallet
              {wallet.wallets.map((item) => (
                <button
                  disabled={!!wallet.connecting}
                  key={item.name}
                  type="button"
                  onClick={() => wallet.select(item.name)}
                >
                  {item.name} {wallet.connecting === item.name ? 'connecting' : ''}
                </button>
              ))}
            </>
          )}
          {/* 
            {!!wallet.agreement && !!(wallet.selected instanceof BitcoinPayWallet) && <>BitcoinPay</>}
            {!!wallet.agreement && !!(wallet.selected instanceof ErgoPayWallet) && (
              <>
                ErgoPay
                {wallet.selected.qrcode}
              </>
            )}
            {!!wallet.agreement && !!(wallet.selected instanceof NautilusWallet) && (
              <>
                Nautilus
                <button onClick={wallet.disconnect}>disconnect</button>
              </>
            )}
          */}
        </DialogContent>
      </Dialog>
    </>
  );
};

'use client';

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

import { type WalletName, wallets } from '@/lib';

type WalletContextValue = {
  addresses?: Record<string, string>;
  wallets: Wallet[];
  selected?: Wallet;
  connecting?: boolean;
  agreed?: boolean;
  error?: unknown;
  ergoAddress?: string;
  candidate?: WalletName;
  setCandidate: (candidate: WalletName | undefined) => void;
  setErgoAddress: (ergoAddress: string | undefined) => void;
  connect: (name: WalletName | undefined) => Promise<void>;
  disconnect: () => Promise<void>;
  agree: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export const useWallet = () => {
  const context = useContext(WalletContext);

  if (context === null) {
    throw new Error('useWallet must be used within WalletProvider');
  }

  return context;
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Record<string, string>>();
  const [error, setError] = useState<unknown>();
  const [connecting, setConnecting] = useState<boolean>();
  const [ergoAddress, setErgoAddress] = useState<string>();
  const [candidate, setCandidate] = useState<WalletName>();
  const [agreed, setAgreed] = useState<boolean>();
  const [selected, setSelected] = useState<Wallet>();

  const agree = useCallback(() => {
    setAgreed(true);
  }, []);

  const connect = useCallback(async (name?: WalletName) => {
    setSelected(undefined);

    const wallet = wallets.find((wallet) => wallet.name === name);

    if (!wallet) return;

    setConnecting(true);

    try {
      await wallet.connect();

      const addresses = await wallet.getAddresses();

      setAddresses(addresses);

      setSelected(wallet);

      localStorage.setItem('raffle:wallet', wallet.name);
    } catch (error) {
      setError(error);
    }

    setConnecting(false);
  }, []);

  const disconnect = useCallback(async () => {
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

      const wallet = wallets.find((wallet) => wallet.name === name);

      if (!wallet) return;

      if (!wallet.isAvailable()) return;

      setConnecting(true);

      if (!(await wallet.isConnected())) {
        setConnecting(false);

        return;
      }

      try {
        await wallet.connect();

        const addresses = await wallet.getAddresses();

        setAddresses(addresses);

        setSelected(wallet);

        setAgreed(true);
      } catch {
        //
      }

      setConnecting(false);
    })();
  }, []);

  useEffect(() => {
    if (candidate) {
      setError(undefined);
    }
  }, [candidate]);

  const value = useMemo(
    () => ({
      candidate,
      setCandidate,
      ergoAddress,
      setErgoAddress,
      addresses,
      agreed,
      connecting,
      error,
      selected,
      wallets,
      disconnect,
      connect,
      agree
    }),
    [
      addresses,
      candidate,
      agreed,
      agree,
      connecting,
      error,
      selected,
      ergoAddress,
      disconnect,
      connect
    ]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

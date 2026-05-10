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

import type { NautilusWallet } from '@ergo-raffle/nautilus-wallet';
import type { XverseWallet } from '@ergo-raffle/xverse-wallet';

import { type WalletInstance, type WalletName, wallets as walletInstances } from '@/lib';

export type WalletContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  addresses?: Record<string, string>;
  wallets: WalletInstance[];
  selected?: WalletInstance;
  connecting?: boolean;
  agreed?: boolean;
  ergoAddress?: string;
  candidate?: WalletName;
  setCandidate: (candidate: WalletName | undefined) => void;
  setErgoAddress: (ergoAddress: string | undefined) => void;
  connect: (name: WalletName | undefined) => Promise<void>;
  openDialog: (names?: WalletName[]) => Promise<WalletInstance | undefined>;
  closeDialog: () => Promise<void>;
  agree: () => void;

  ensureConnected(name: 'Nautilus'): NautilusWallet;
  ensureConnected(name: 'Xverse'): XverseWallet;
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
  const [open, setOpen] = useState(false);

  const [dialogResolver, setDialogResolver] = useState<((value?: WalletInstance) => void) | null>(
    null
  );

  const [addresses, setAddresses] = useState<Record<string, string>>();
  const [connecting, setConnecting] = useState<boolean>();
  const [ergoAddress, setErgoAddress] = useState<string>();
  const [candidate, setCandidate] = useState<WalletName>();
  const [agreed, setAgreed] = useState<boolean>();
  const [selected, setSelected] = useState<WalletInstance>();
  const [wallets, setWallets] = useState<WalletInstance[]>(walletInstances);

  const agree = useCallback(() => {
    setAgreed(true);
  }, []);

  const connect = useCallback(
    async (name?: WalletName) => {
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

        setOpen(false);
        dialogResolver?.(wallet);
        setDialogResolver(null);

        setConnecting(false);
      } catch (error) {
        setConnecting(false);
        throw error;
      }
    },
    [dialogResolver, wallets]
  );

  const openDialog = useCallback(
    async (names?: WalletName[]): Promise<WalletInstance | undefined> => {
      if (names?.length) {
        setWallets(walletInstances.filter((wallet) => names.includes(wallet.name)));
      }
      setOpen(true);
      return new Promise<WalletInstance | undefined>((resolve) => {
        setDialogResolver(() => resolve);
      });
    },
    []
  );

  const closeDialog = useCallback(async () => {
    setOpen(false);
    dialogResolver?.(undefined);
    setDialogResolver(null);
  }, [dialogResolver]);

  const ensureConnected = useCallback(
    (name: WalletName) => {
      if (selected?.name !== name) {
        throw new Error(`Must be connected to ${name} wallet.`);
      }

      if (!selected) {
        throw new Error(`No wallet is connected`);
      }

      // biome-ignore lint/suspicious/noExplicitAny: make this better
      return selected as any;
    },
    [selected]
  );

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
  }, [wallets]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      candidate,
      setCandidate,
      ergoAddress,
      setErgoAddress,
      addresses,
      agreed,
      connecting,
      selected,
      wallets,
      connect,
      openDialog,
      agree,
      closeDialog,
      ensureConnected
    }),
    [
      open,
      addresses,
      candidate,
      agreed,
      agree,
      connecting,
      selected,
      ergoAddress,
      connect,
      openDialog,
      ensureConnected,
      closeDialog,
      wallets
    ]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

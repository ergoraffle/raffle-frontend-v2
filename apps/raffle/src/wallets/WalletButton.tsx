import { useEffect, useMemo, useState } from 'react';
import { Wallet as WalletIcon } from '@ergo-raffle/icons';
import { Button, Dialog, DialogContent } from '@ergo-raffle/ui-kit';
import { Agreement } from './Agreement';
import { ChooseWallet } from './ChooseWallet';
import { ErgoWalletAddress } from './ErgoWalletAddress';
import { useWallet } from './useWallet';

 
export const WalletButton = () => {
  const wallet = useWallet();

  const [open, setOpen] = useState(false);

  const state = useMemo<'agreement' | 'wallet' | 'ergoAddress'>(() => {
    if (!wallet.agreed) return 'agreement';

    if (wallet.candidate === 'Nautilus') return 'wallet';

    if (wallet.candidate) return 'ergoAddress';

    return 'wallet';
  }, [wallet])

  useEffect(() => {
    if (!wallet.error) return;

    // biome-ignore lint/suspicious/noAlert: will remove
    alert(wallet.error);

    setOpen(false);
  }, [wallet.error]);

  useEffect(() => {
    if (wallet.selected) {
      setOpen(false);
    }
  }, [wallet.selected]);

  useEffect(() => {
    if (wallet.candidate === 'Nautilus') {
      wallet.connect(wallet.candidate);
    }
  }, [wallet.candidate, wallet.connect]);

  useEffect(() => {
    if (!open) {
      wallet.setCandidate(undefined);
      wallet.setErgoAddress(undefined);
    }
  }, [open, wallet.setCandidate, wallet.setErgoAddress]);

  useEffect(() => {
    if (wallet.candidate && wallet.ergoAddress) {
      wallet.connect(wallet.candidate);
    }
  }, [wallet.candidate, wallet.ergoAddress, wallet.connect]);

  return (
    <>
      <Button disabled={!!wallet.connecting} variant="outline-soft" onClick={() => setOpen(true)}>
        <WalletIcon className="hidden lg:inline-flex" />
        {!!wallet.connecting && (
          <div>
            connecting...
          </div>
        )}
        {!wallet.connecting && !!wallet.selected && (
          <div>
            {wallet.addresses?.join(', ')}
          </div>
        )}
        {!wallet.connecting && !wallet.selected && (
          <>
            <span className="hidden lg:inline-flex">Connect Wallet</span>
            <span className="lg:hidden">Set Wallet</span>
          </>
        )}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {(() => {
            switch (state) {
              case "agreement":
                return <Agreement />
              case "wallet":
                return <ChooseWallet />
              case "ergoAddress":
                return <ErgoWalletAddress />
            }
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
};

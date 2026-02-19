import { Wallet } from '@ergo-raffle/icons';

import { Button } from './Button';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';

export const ConnectWallet = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline-soft">
        <Wallet className="hidden lg:inline-flex" />
        <span className="hidden lg:inline-flex">Connect Wallet</span>
        <span className="lg:hidden">Set Wallet</span>
      </Button>
    </DialogTrigger>
    <DialogContent>Connecting Wallet Content</DialogContent>
  </Dialog>
);

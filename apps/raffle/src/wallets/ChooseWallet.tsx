import { DialogClose, DialogHeader, DialogTitle } from "@ergo-raffle/ui-kit";
import { useWallet } from "./useWallet";
import type { WalletName } from "./wallets";

export const ChooseWallet = () => {
  const wallet = useWallet();
  return (
    <>
      <DialogHeader>
        <DialogClose />
        <DialogTitle>Connect Wallet</DialogTitle>
      </DialogHeader>
      
      {wallet.wallets.map((item) => (
        <button
          className="flex items-center gap-3"
          disabled={!!wallet.connecting}
          key={item.name}
          type="button"
          onClick={() => wallet.setCandidate(item.name as WalletName)}
        >
          <div className="w-12 h-12">
            <item.iconReact />
          </div>
          {item.name} {wallet.connecting && wallet.candidate === item.name ? 'connecting' : ''}
        </button>
      ))}
    </>
  )
}
